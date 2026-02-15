import request from 'supertest';
import express from 'express';
import { RegisterRoutes } from '@/routes/routes';
import { createTestBooking, createTestUser } from '@/test/helpers';
import { prisma } from '@/lib/prisma';

// Create Express app for testing
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
RegisterRoutes(app);

describe('Reporting Module - Payments', () => {
	describe('POST /api/payments', () => {
		it('should create a payment', async () => {
			const booking = await createTestBooking();

			const response = await request(app)
				.post('/api/payments')
				.send({
					bookingId: booking.id,
					amount: 1500000,
					paymentMethod: 'bank_transfer',
				});

			expect(response.status).toBe(201);
			expect(response.body.bookingId).toBe(booking.id);
			expect(response.body.amount).toBe(1500000);
			expect(response.body.paymentMethod).toBe('bank_transfer');
			expect(response.body.status).toBe('pending');
		});

		it('should reject payment for non-existent booking', async () => {
			const response = await request(app)
				.post('/api/payments')
				.send({
					bookingId: 99999,
					amount: 1500000,
					paymentMethod: 'bank_transfer',
				});

			expect(response.status).toBe(404);
		});
	});

	describe('GET /api/payments', () => {
		it('should get all payments', async () => {
			const booking1 = await createTestBooking();
			const booking2 = await createTestBooking();

			await prisma.payment.create({
				data: {
					bookingId: booking1.id,
					amount: 1000000,
					paymentMethod: 'bank_transfer',
					status: 'pending',
				} as any,
			});

			await prisma.payment.create({
				data: {
					bookingId: booking2.id,
					amount: 1200000,
					paymentMethod: 'cash',
					status: 'completed',
				} as any,
			});

			const response = await request(app).get('/api/payments');

			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body.length).toBeGreaterThanOrEqual(2);
		});

		it('should filter payments by status', async () => {
			const booking1 = await createTestBooking();
			const booking2 = await createTestBooking();

			await prisma.payment.create({
				data: {
					bookingId: booking1.id,
					amount: 1000000,
					paymentMethod: 'bank_transfer',
					status: 'pending',
				} as any,
			});

			await prisma.payment.create({
				data: {
					bookingId: booking2.id,
					amount: 1200000,
					paymentMethod: 'cash',
					status: 'completed',
				} as any,
			});

			const response = await request(app)
				.get('/api/payments')
				.query({ status: 'completed' });

			expect(response.status).toBe(200);
			response.body.forEach((payment: any) => {
				expect(payment.status).toBe('completed');
			});
		});
	});

	describe('PUT /api/payments/:id', () => {
		it('should update payment status', async () => {
			const booking = await createTestBooking();
			const payment = await prisma.payment.create({
				data: {
					bookingId: booking.id,
					amount: 1000000,
					paymentMethod: 'bank_transfer',
					status: 'pending',
				} as any,
			});

			const response = await request(app)
				.put(`/api/payments/${payment.id}`)
				.send({
					status: 'completed',
					paidAt: new Date().toISOString(),
				});

			expect(response.status).toBe(200);
			expect(response.body.status).toBe('completed');
			expect(response.body.paidAt).toBeTruthy();
		});
	});
});

describe('Reporting Module - Activity Logs', () => {
	describe('POST /api/activity-logs', () => {
		it('should create an activity log', async () => {
			const user = await createTestUser();

			const response = await request(app)
				.post('/api/activity-logs')
				.send({
					userId: user.id,
					action: 'login',
					entityType: 'user',
					entityId: user.id,
				});

			expect(response.status).toBe(201);
			expect(response.body.userId).toBe(user.id);
			expect(response.body.action).toBe('login');
		});
	});

	describe('GET /api/activity-logs', () => {
		it('should get activity logs', async () => {
			const user = await createTestUser();

			await prisma.activityLog.create({
				data: {
					userId: user.id,
					action: 'login',
					entityType: 'user',
					entityId: user.id,
				},
			});

			await prisma.activityLog.create({
				data: {
					userId: user.id,
					action: 'logout',
					entityType: 'user',
					entityId: user.id,
				},
			});

			const response = await request(app).get('/api/activity-logs');

			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body.length).toBeGreaterThanOrEqual(2);
		});

		it('should filter activity logs by user', async () => {
			const user1 = await createTestUser();
			const user2 = await createTestUser();

			await prisma.activityLog.create({
				data: {
					userId: user1.id,
					action: 'login',
					entityType: 'user',
					entityId: user1.id,
				},
			});

			await prisma.activityLog.create({
				data: {
					userId: user2.id,
					action: 'login',
					entityType: 'user',
					entityId: user2.id,
				},
			});

			const response = await request(app)
				.get('/api/activity-logs')
				.query({ userId: user1.id });

			expect(response.status).toBe(200);
			response.body.forEach((log: any) => {
				expect(log.userId).toBe(user1.id);
			});
		});
	});
});
