import { prisma } from '@/lib/prisma';
import dotenv from 'dotenv';
import path from 'path';

// Load test environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });

// Global setup before all tests
beforeAll(async () => {
	// Ensure we're in test environment
	if (process.env.NODE_ENV !== 'test') {
		throw new Error('Tests must be run with NODE_ENV=test');
	}

	// Connect to database
	await prisma.$connect();
});

// Cleanup after each test
afterEach(async () => {
	// Clean up test data in reverse order of dependencies
	await prisma.activityLog.deleteMany({});
	await prisma.payment.deleteMany({});
	await prisma.message.deleteMany({});
	await prisma.booking.deleteMany({});
	await prisma.propertyFacility.deleteMany({});
	await prisma.facility.deleteMany({});
	await prisma.room.deleteMany({});
	await prisma.property.deleteMany({});
	await prisma.address.deleteMany({});
	await prisma.user.deleteMany({});
});

// Global teardown after all tests
afterAll(async () => {
	await prisma.$disconnect();
});
