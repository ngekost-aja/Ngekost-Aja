import request from 'supertest';
import express from 'express';
import { RegisterRoutes } from '@/routes/routes';
import { createTestUser } from '@/test/helpers';
import { prisma } from '@/lib/prisma';

// Create Express app for testing
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
RegisterRoutes(app);

describe('Communication Module', () => {
	describe('POST /api/messages', () => {
		it('should send a message', async () => {
			const sender = await createTestUser({ role: 'student' });
			const receiver = await createTestUser({ role: 'owner' });

			const response = await request(app)
				.post('/api/messages')
				.send({
					senderId: sender.id,
					receiverId: receiver.id,
					message: 'Hello, I am interested in your property',
				});

			expect(response.status).toBe(201);
			expect(response.body.senderId).toBe(sender.id);
			expect(response.body.receiverId).toBe(receiver.id);
			expect(response.body.message).toBe('Hello, I am interested in your property');
			expect(response.body.isRead).toBe(false);
		});

		it('should reject message without required fields', async () => {
			const response = await request(app)
				.post('/api/messages')
				.send({
					message: 'Incomplete message',
				});

			expect(response.status).toBe(400);
		});
	});

	describe('GET /api/messages', () => {
		it('should get messages between two users', async () => {
			const user1 = await createTestUser();
			const user2 = await createTestUser();

			// Create messages
			await prisma.message.create({
				data: {
					senderId: user1.id,
					receiverId: user2.id,
					message: 'Message 1',
					isRead: false,
				} as any,
			});

			await prisma.message.create({
				data: {
					senderId: user2.id,
					receiverId: user1.id,
					message: 'Message 2',
					isRead: false,
				} as any,
			});

			const response = await request(app)
				.get('/api/messages')
				.query({
					userId1: user1.id,
					userId2: user2.id,
				});

			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body.length).toBe(2);
		});

		it('should get messages for a specific user', async () => {
			const user = await createTestUser();
			const other1 = await createTestUser();
			const other2 = await createTestUser();

			await prisma.message.create({
				data: {
					senderId: user.id,
					receiverId: other1.id,
					message: 'To other1',
					isRead: false,
				} as any,
			});

			await prisma.message.create({
				data: {
					senderId: other2.id,
					receiverId: user.id,
					message: 'From other2',
					isRead: false,
				} as any,
			});

			const response = await request(app)
				.get('/api/messages')
				.query({ userId: user.id });

			expect(response.status).toBe(200);
			expect(response.body.length).toBeGreaterThanOrEqual(2);
		});
	});

	describe('PUT /api/messages/:id/read', () => {
		it('should mark message as read', async () => {
			const sender = await createTestUser();
			const receiver = await createTestUser();

			const message = await prisma.message.create({
				data: {
					senderId: sender.id,
					receiverId: receiver.id,
					message: 'Test message',
					isRead: false,
				} as any,
			});

			const response = await request(app)
				.put(`/api/messages/${message.id}/read`);

			expect(response.status).toBe(200);
			expect(response.body.isRead).toBe(true);
		});
	});

	describe('DELETE /api/messages/:id', () => {
		it('should delete a message', async () => {
			const sender = await createTestUser();
			const receiver = await createTestUser();

			const message = await prisma.message.create({
				data: {
					senderId: sender.id,
					receiverId: receiver.id,
					message: 'Test message',
					isRead: false,
				} as any,
			});

			const response = await request(app)
				.delete(`/api/messages/${message.id}`);

			expect(response.status).toBe(204);

			// Verify message is deleted
			const deletedMessage = await prisma.message.findUnique({
				where: { id: message.id },
			});
			expect(deletedMessage).toBeNull();
		});
	});
});
