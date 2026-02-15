import request from 'supertest';
import express from 'express';
import { RegisterRoutes } from '@/routes/routes';
import {
	createTestUser,
	createTestRoom,
	createTestBooking,
} from '@/test/helpers';

// Create Express app for testing
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
RegisterRoutes(app);

describe('Booking Module', () => {
	describe('POST /api/bookings', () => {
		it('should create a new booking', async () => {
			const student = await createTestUser({ role: 'student' });
			const room = await createTestRoom();

			const startDate = new Date();
			const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

			const response = await request(app)
				.post('/api/bookings')
				.send({
					studentId: student.id,
					roomId: room.id,
					startDate: startDate.toISOString(),
					endDate: endDate.toISOString(),
				});

			expect(response.status).toBe(201);
			expect(response.body.studentId).toBe(student.id);
			expect(response.body.roomId).toBe(room.id);
			expect(response.body.status).toBe('pending');
		});

		it('should reject overlapping bookings', async () => {
			const student = await createTestUser({ role: 'student' });
			const room = await createTestRoom();

			const startDate = new Date();
			const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

			// Create first booking
			await createTestBooking({
				studentId: student.id,
				roomId: room.id,
				startDate,
				endDate,
				status: 'approved',
			});

			// Try to create overlapping booking
			const response = await request(app)
				.post('/api/bookings')
				.send({
					studentId: student.id,
					roomId: room.id,
					startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
					endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
				});

			expect(response.status).toBe(400);
			expect(response.body.message).toContain('overlap');
		});

		it('should reject booking with end date before start date', async () => {
			const student = await createTestUser({ role: 'student' });
			const room = await createTestRoom();

			const response = await request(app)
				.post('/api/bookings')
				.send({
					studentId: student.id,
					roomId: room.id,
					startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
					endDate: new Date().toISOString(),
				});

			expect(response.status).toBe(400);
		});
	});

	describe('GET /api/bookings', () => {
		it('should get all bookings', async () => {
			await createTestBooking();
			await createTestBooking();

			const response = await request(app).get('/api/bookings');

			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body.length).toBeGreaterThanOrEqual(2);
		});

		it('should filter bookings by student', async () => {
			const student1 = await createTestUser({ role: 'student' });
			const student2 = await createTestUser({ role: 'student' });

			await createTestBooking({ studentId: student1.id });
			await createTestBooking({ studentId: student2.id });

			const response = await request(app)
				.get('/api/bookings')
				.query({ studentId: student1.id });

			expect(response.status).toBe(200);
			expect(response.body.length).toBe(1);
			expect(response.body[0].studentId).toBe(student1.id);
		});

		it('should filter bookings by status', async () => {
			await createTestBooking({ status: 'pending' });
			await createTestBooking({ status: 'approved' });

			const response = await request(app)
				.get('/api/bookings')
				.query({ status: 'approved' });

			expect(response.status).toBe(200);
			response.body.forEach((booking: any) => {
				expect(booking.status).toBe('approved');
			});
		});
	});

	describe('GET /api/bookings/:id', () => {
		it('should get booking by ID', async () => {
			const booking = await createTestBooking();

			const response = await request(app).get(`/api/bookings/${booking.id}`);

			expect(response.status).toBe(200);
			expect(response.body.id).toBe(booking.id);
		});

		it('should return 404 for non-existent booking', async () => {
			const response = await request(app).get('/api/bookings/99999');

			expect(response.status).toBe(404);
		});
	});

	describe('PUT /api/bookings/:id', () => {
		it('should update booking status', async () => {
			const booking = await createTestBooking({ status: 'pending' });

			const response = await request(app)
				.put(`/api/bookings/${booking.id}`)
				.send({
					status: 'approved',
				});

			expect(response.status).toBe(200);
			expect(response.body.status).toBe('approved');
		});

		it('should update booking dates', async () => {
			const booking = await createTestBooking();
			const newEndDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

			const response = await request(app)
				.put(`/api/bookings/${booking.id}`)
				.send({
					endDate: newEndDate.toISOString(),
				});

			expect(response.status).toBe(200);
			expect(new Date(response.body.endDate).getTime()).toBe(newEndDate.getTime());
		});
	});

	describe('DELETE /api/bookings/:id', () => {
		it('should delete booking', async () => {
			const booking = await createTestBooking();

			const response = await request(app).delete(`/api/bookings/${booking.id}`);

			expect(response.status).toBe(204);

			// Verify booking is deleted
			const getResponse = await request(app).get(`/api/bookings/${booking.id}`);
			expect(getResponse.status).toBe(404);
		});
	});
});
