import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

/**
 * Generate JWT token for testing
 */
export function generateToken(userId: number, role: string = 'student'): string {
	return jwt.sign(
		{ userId, role },
		process.env.JWT_SECRET || 'test-secret',
		{ expiresIn: '1h' }
	);
}

/**
 * Create a test user
 */
export async function createTestUser(data?: {
	name?: string;
	email?: string;
	phone?: string;
	role?: string;
	password?: string;
}) {
	const passwordHash = await bcrypt.hash(data?.password || 'password123', 10);

	return await prisma.user.create({
		data: {
			name: data?.name || 'Test User',
			email: data?.email || `test${Date.now()}@example.com`,
			phone: data?.phone || `08${Date.now().toString().slice(-9)}`,
			role: data?.role || 'student',
			passwordHash,
		} as any,
	});
}

/**
 * Create a test address
 */
export async function createTestAddress(data?: {
	street?: string;
	province?: string;
	postalCode?: string;
}) {
	return await prisma.address.create({
		data: {
			street: data?.street || 'Jl. Test No. 123',
			province: data?.province || 'DKI Jakarta',
			postalCode: data?.postalCode || '12345',
		} as any,
	});
}

/**
 * Create a test property
 */
export async function createTestProperty(data?: {
	name?: string;
	ownerId?: number;
	addressId?: number;
	latitude?: number;
	longitude?: number;
	genderType?: string;
}) {
	let ownerId = data?.ownerId;
	if (!ownerId) {
		const owner = await createTestUser({ role: 'owner' });
		ownerId = owner.id;
	}

	let addressId = data?.addressId;
	if (!addressId) {
		const address = await createTestAddress();
		addressId = address.id;
	}

	return await prisma.property.create({
		data: {
			name: data?.name || 'Test Property',
			ownerId,
			addressId,
			latitude: data?.latitude || -6.2088,
			longitude: data?.longitude || 106.8456,
			genderType: data?.genderType || 'mixed',
			status: 'active',
		} as any,
	});
}

/**
 * Create a test room
 */
export async function createTestRoom(data?: {
	propertyId?: number;
	roomNumber?: string;
	price?: number;
	status?: string;
}) {
	let propertyId = data?.propertyId;
	if (!propertyId) {
		const property = await createTestProperty();
		propertyId = property.id;
	}

	return await prisma.room.create({
		data: {
			propertyId,
			roomNumber: data?.roomNumber || `R${Date.now().toString().slice(-3)}`,
			price: data?.price || 1000000,
			status: data?.status || 'available',
		} as any,
	});
}

/**
 * Create a test booking
 */
export async function createTestBooking(data?: {
	studentId?: number;
	roomId?: number;
	startDate?: Date;
	endDate?: Date;
	status?: string;
}) {
	let studentId = data?.studentId;
	if (!studentId) {
		const student = await createTestUser({ role: 'student' });
		studentId = student.id;
	}

	let roomId = data?.roomId;
	if (!roomId) {
		const room = await createTestRoom();
		roomId = room.id;
	}

	const startDate = data?.startDate || new Date();
	const endDate = data?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

	return await prisma.booking.create({
		data: {
			studentId,
			roomId,
			startDate,
			endDate,
			status: data?.status || 'pending',
		} as any,
	});
}
