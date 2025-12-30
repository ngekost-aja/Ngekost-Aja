import { BookingRepository } from "./booking.repository";
import { prisma } from "@/lib/prisma";
import type {
	CreateBookingRequest,
	UpdateBookingRequest,
	BookingResponse,
	BookingListRequest,
} from "./booking.dto";

export class BookingService {
	private repository: BookingRepository;

	constructor() {
		this.repository = new BookingRepository();
	}

	/**
	 * List bookings with filters
	 */
	async listBookings(filters: BookingListRequest): Promise<BookingResponse[]> {
		const { studentId, roomId, propertyId, status, page = 1, limit = 20 } = filters;

		const where: any = {};

		if (studentId) where.studentId = studentId;
		if (roomId) where.roomId = roomId;
		if (propertyId) where.room = { propertyId };
		if (status) where.status = status;

		return await this.repository.findBookings(where, (page - 1) * limit, limit);
	}

	/**
	 * Get booking by ID
	 */
	async getBookingById(id: number): Promise<BookingResponse> {
		const booking = await this.repository.findById(id);
		if (!booking) throw new Error("Booking not found");
		return booking;
	}

	/**
	 * Create a new booking
	 */
	async createBooking(data: CreateBookingRequest): Promise<BookingResponse> {
		// Check if room exists and is available
		const room = await prisma.room.findUnique({ where: { id: data.roomId } });
		if (!room) throw new Error("Room not found");
		if (room.status !== 'available') throw new Error("Room is not available");

		// Check for overlapping bookings
		const overlapping = await this.repository.findOverlappingBookings(
			data.roomId,
			new Date(data.startDate),
			new Date(data.endDate)
		);

		if (overlapping) {
			throw new Error("Room is already booked for the selected dates");
		}

		// Create booking
		return await this.repository.create({
			studentId: data.studentId,
			roomId: data.roomId,
			startDate: new Date(data.startDate),
			endDate: new Date(data.endDate),
			status: 'pending',
		});
	}

	/**
	 * Update booking
	 */
	async updateBooking(id: number, data: UpdateBookingRequest): Promise<BookingResponse> {
		const existing = await this.repository.findById(id);
		if (!existing) throw new Error("Booking not found");

		return await this.repository.update(id, {
			...(data.startDate && { startDate: new Date(data.startDate) }),
			...(data.endDate && { endDate: new Date(data.endDate) }),
			...(data.status && { status: data.status }),
		});
	}

	/**
	 * Confirm booking (approve)
	 */
	async confirmBooking(id: number): Promise<BookingResponse> {
		const booking = await this.repository.findById(id);
		if (!booking) throw new Error("Booking not found");
		if (booking.status !== 'pending') {
			throw new Error("Only pending bookings can be confirmed");
		}

		const updated = await this.repository.update(id, { status: 'approved' });

		// Update room status to occupied
		await prisma.room.update({
			where: { id: booking.roomId },
			data: { status: 'occupied' },
		});

		return updated;
	}

	/**
	 * Reject booking
	 */
	async rejectBooking(id: number): Promise<BookingResponse> {
		const booking = await this.repository.findById(id);
		if (!booking) throw new Error("Booking not found");
		if (booking.status !== 'pending') {
			throw new Error("Only pending bookings can be rejected");
		}

		return await this.repository.update(id, { status: 'rejected' });
	}

	/**
	 * Cancel booking
	 */
	async cancelBooking(id: number): Promise<BookingResponse> {
		const booking = await this.repository.findById(id);
		if (!booking) throw new Error("Booking not found");
		if (booking.status === 'cancelled' || booking.status === 'rejected') {
			throw new Error("Booking is already cancelled or rejected");
		}

		const updated = await this.repository.update(id, { status: 'cancelled' });

		// If booking was approved, make room available again
		if (booking.status === 'approved') {
			await prisma.room.update({
				where: { id: booking.roomId },
				data: { status: 'available' },
			});
		}

		return updated;
	}

	/**
	 * Delete booking
	 */
	async deleteBooking(id: number): Promise<void> {
		const booking = await this.repository.findById(id);
		if (!booking) throw new Error("Booking not found");
		await this.repository.delete(id);
	}
}
