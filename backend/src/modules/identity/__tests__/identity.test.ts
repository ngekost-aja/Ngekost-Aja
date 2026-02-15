import request from 'supertest';
import express from 'express';
import { RegisterRoutes } from '@/routes/routes';
import { generateToken, createTestUser } from '@/test/helpers';
import bcrypt from 'bcrypt';

// Create Express app for testing
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
RegisterRoutes(app);

describe('Identity Module - Authentication', () => {
	describe('POST /api/auth/register', () => {
		it('should register a new user successfully', async () => {
			const response = await request(app)
				.post('/api/auth/register')
				.send({
					name: 'John Doe',
					email: 'john@example.com',
					phone: '081234567890',
					password: 'password123',
					role: 'student',
				});

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty('user');
			expect(response.body).toHaveProperty('token');
			expect(response.body.user.email).toBe('john@example.com');
			expect(response.body.user).not.toHaveProperty('passwordHash');
		});

		it('should reject duplicate email', async () => {
			await createTestUser({ email: 'duplicate@example.com' });

			const response = await request(app)
				.post('/api/auth/register')
				.send({
					name: 'Jane Doe',
					email: 'duplicate@example.com',
					phone: '081234567891',
					password: 'password123',
					role: 'student',
				});

			expect(response.status).toBe(400);
		});

		it('should reject invalid email format', async () => {
			const response = await request(app)
				.post('/api/auth/register')
				.send({
					name: 'Invalid User',
					email: 'not-an-email',
					phone: '081234567892',
					password: 'password123',
					role: 'student',
				});

			expect(response.status).toBe(400);
		});
	});

	describe('POST /api/auth/login', () => {
		it('should login with valid credentials', async () => {
			const password = 'password123';
			await createTestUser({
				email: 'login@example.com',
				password,
			});

			const response = await request(app)
				.post('/api/auth/login')
				.send({
					email: 'login@example.com',
					password,
				});

			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('user');
			expect(response.body).toHaveProperty('token');
			expect(response.body.user.email).toBe('login@example.com');
		});

		it('should reject invalid password', async () => {
			await createTestUser({
				email: 'test@example.com',
				password: 'correctpassword',
			});

			const response = await request(app)
				.post('/api/auth/login')
				.send({
					email: 'test@example.com',
					password: 'wrongpassword',
				});

			expect(response.status).toBe(401);
		});

		it('should reject non-existent user', async () => {
			const response = await request(app)
				.post('/api/auth/login')
				.send({
					email: 'nonexistent@example.com',
					password: 'password123',
				});

			expect(response.status).toBe(404);
		});
	});
});

describe('Identity Module - User Management', () => {
	describe('GET /api/users', () => {
		it('should get all users', async () => {
			await createTestUser({ name: 'User 1' });
			await createTestUser({ name: 'User 2' });

			const response = await request(app).get('/api/users');

			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body.length).toBeGreaterThanOrEqual(2);
		});
	});

	describe('GET /api/users/:id', () => {
		it('should get user by ID', async () => {
			const user = await createTestUser({ name: 'Test User' });

			const response = await request(app).get(`/api/users/${user.id}`);

			expect(response.status).toBe(200);
			expect(response.body.id).toBe(user.id);
			expect(response.body.name).toBe('Test User');
			expect(response.body).not.toHaveProperty('passwordHash');
		});

		it('should return 404 for non-existent user', async () => {
			const response = await request(app).get('/api/users/99999');

			expect(response.status).toBe(404);
		});
	});

	describe('PUT /api/users/:id', () => {
		it('should update user', async () => {
			const user = await createTestUser({ name: 'Original Name' });

			const response = await request(app)
				.put(`/api/users/${user.id}`)
				.send({
					name: 'Updated Name',
				});

			expect(response.status).toBe(200);
			expect(response.body.name).toBe('Updated Name');
		});

		it('should reject duplicate email on update', async () => {
			const user1 = await createTestUser({ email: 'user1@example.com' });
			const user2 = await createTestUser({ email: 'user2@example.com' });

			const response = await request(app)
				.put(`/api/users/${user2.id}`)
				.send({
					email: 'user1@example.com',
				});

			expect(response.status).toBe(400);
		});
	});

	describe('DELETE /api/users/:id', () => {
		it('should delete user', async () => {
			const user = await createTestUser();

			const response = await request(app).delete(`/api/users/${user.id}`);

			expect(response.status).toBe(204);

			// Verify user is deleted
			const getResponse = await request(app).get(`/api/users/${user.id}`);
			expect(getResponse.status).toBe(404);
		});
	});
});
