import request from 'supertest';
import express from 'express';
import { RegisterRoutes } from '@/routes/routes';
import {
	createTestUser,
	createTestProperty,
	createTestRoom,
	createTestAddress,
} from '@/test/helpers';

// Create Express app for testing
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
RegisterRoutes(app);

describe('Property Module - Properties', () => {
	describe('POST /api/properties', () => {
		it('should create a new property', async () => {
			const owner = await createTestUser({ role: 'owner' });
			const address = await createTestAddress();

			const response = await request(app)
				.post('/api/properties')
				.send({
					name: 'Test Kost',
					ownerId: owner.id,
					addressId: address.id,
					latitude: -6.2088,
					longitude: 106.8456,
					genderType: 'mixed',
				});

			expect(response.status).toBe(201);
			expect(response.body.name).toBe('Test Kost');
			expect(response.body.genderType).toBe('mixed');
		});

		it('should reject property without required fields', async () => {
			const response = await request(app)
				.post('/api/properties')
				.send({
					name: 'Incomplete Property',
				});

			expect(response.status).toBe(400);
		});
	});

	describe('GET /api/properties', () => {
		it('should get all properties', async () => {
			await createTestProperty({ name: 'Property 1' });
			await createTestProperty({ name: 'Property 2' });

			const response = await request(app).get('/api/properties');

			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body.length).toBeGreaterThanOrEqual(2);
		});

		it('should filter properties by owner', async () => {
			const owner1 = await createTestUser({ role: 'owner' });
			const owner2 = await createTestUser({ role: 'owner' });

			await createTestProperty({ name: 'Owner 1 Property', ownerId: owner1.id });
			await createTestProperty({ name: 'Owner 2 Property', ownerId: owner2.id });

			const response = await request(app)
				.get('/api/properties')
				.query({ ownerId: owner1.id });

			expect(response.status).toBe(200);
			expect(response.body.length).toBe(1);
			expect(response.body[0].ownerId).toBe(owner1.id);
		});
	});

	describe('GET /api/properties/:id', () => {
		it('should get property by ID', async () => {
			const property = await createTestProperty({ name: 'Test Property' });

			const response = await request(app).get(`/api/properties/${property.id}`);

			expect(response.status).toBe(200);
			expect(response.body.id).toBe(property.id);
			expect(response.body.name).toBe('Test Property');
		});

		it('should return 404 for non-existent property', async () => {
			const response = await request(app).get('/api/properties/99999');

			expect(response.status).toBe(404);
		});
	});

	describe('PUT /api/properties/:id', () => {
		it('should update property', async () => {
			const property = await createTestProperty({ name: 'Original Name' });

			const response = await request(app)
				.put(`/api/properties/${property.id}`)
				.send({
					name: 'Updated Name',
				});

			expect(response.status).toBe(200);
			expect(response.body.name).toBe('Updated Name');
		});
	});

	describe('DELETE /api/properties/:id', () => {
		it('should delete property', async () => {
			const property = await createTestProperty();

			const response = await request(app).delete(`/api/properties/${property.id}`);

			expect(response.status).toBe(204);
		});
	});
});

describe('Property Module - Rooms', () => {
	describe('POST /api/rooms', () => {
		it('should create a new room', async () => {
			const property = await createTestProperty();

			const response = await request(app)
				.post('/api/rooms')
				.send({
					propertyId: property.id,
					roomNumber: 'A101',
					price: 1500000,
				});

			expect(response.status).toBe(201);
			expect(response.body.roomNumber).toBe('A101');
			expect(response.body.price).toBe(1500000);
			expect(response.body.status).toBe('available');
		});
	});

	describe('GET /api/properties/:propertyId/rooms', () => {
		it('should get all rooms for a property', async () => {
			const property = await createTestProperty();
			await createTestRoom({ propertyId: property.id, roomNumber: 'A101' });
			await createTestRoom({ propertyId: property.id, roomNumber: 'A102' });

			const response = await request(app).get(`/api/properties/${property.id}/rooms`);

			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body.length).toBe(2);
		});
	});

	describe('PUT /api/rooms/:id', () => {
		it('should update room', async () => {
			const room = await createTestRoom({ price: 1000000 });

			const response = await request(app)
				.put(`/api/rooms/${room.id}`)
				.send({
					price: 1200000,
					status: 'occupied',
				});

			expect(response.status).toBe(200);
			expect(response.body.price).toBe(1200000);
			expect(response.body.status).toBe('occupied');
		});
	});

	describe('DELETE /api/rooms/:id', () => {
		it('should delete room', async () => {
			const room = await createTestRoom();

			const response = await request(app).delete(`/api/rooms/${room.id}`);

			expect(response.status).toBe(204);
		});
	});
});

describe('Property Module - Facilities', () => {
	describe('GET /api/facilities', () => {
		it('should get all facilities', async () => {
			const response = await request(app).get('/api/facilities');

			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBe(true);
		});
	});

	describe('POST /api/facilities', () => {
		it('should create a new facility', async () => {
			const response = await request(app)
				.post('/api/facilities')
				.send({
					name: 'WiFi',
				});

			expect(response.status).toBe(201);
			expect(response.body.name).toBe('WiFi');
		});
	});
});
