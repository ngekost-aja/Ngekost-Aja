import { prisma } from "@/lib/prisma";

export class BookingPolicy {
	/**
	 * Check if user can create a booking
	 */
	static async canCreateBooking(userId: number, roomId: number): Promise<boolean> {
		// Students can book rooms
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return false;
		}

		// Only users with 'user' role can book
		return user.role === 'user';
	}

	/**
	 * Check if user can confirm/reject a booking
	 */
	static async canManageBooking(userId: number, bookingId: number): Promise<boolean> {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return false;
		}

		// Only managers and owners can confirm/reject bookings
		if (user.role !== 'manager' && user.role !== 'owner') {
			return false;
		}

		// Get the booking and check if user is the manager or owner of the property
		const booking = await prisma.booking.findUnique({
			where: { id: bookingId },
			include: {
				room: {
					include: {
						property: true,
					},
				},
			},
		});

		if (!booking) {
			return false;
		}

		const property = booking.room.property;

		// Check if user is the owner or manager of the property
		return (
			property.ownerId === userId ||
			property.managerId === userId
		);
	}

	/**
	 * Check if user can cancel a booking
	 */
	static async canCancelBooking(userId: number, bookingId: number): Promise<boolean> {
		const booking = await prisma.booking.findUnique({
			where: { id: bookingId },
		});

		if (!booking) {
			return false;
		}

		// Students can cancel their own bookings
		return booking.studentId === userId;
	}

	/**
	 * Check if user can view a booking
	 */
	static async canViewBooking(userId: number, bookingId: number): Promise<boolean> {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			return false;
		}

		const booking = await prisma.booking.findUnique({
			where: { id: bookingId },
			include: {
				room: {
					include: {
						property: true,
					},
				},
			},
		});

		if (!booking) {
			return false;
		}

		// Student can view their own booking
		if (booking.studentId === userId) {
			return true;
		}

		// Manager/Owner can view bookings for their properties
		const property = booking.room.property;
		return (
			property.ownerId === userId ||
			property.managerId === userId
		);
	}
}
