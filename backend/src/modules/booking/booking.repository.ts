import { prisma } from "@/lib/prisma";
import type { Booking, Prisma } from "@/generated/prisma/client";

export class BookingRepository {
	/**
	 * Find bookings with filters
	 */
	async findBookings(where: Prisma.BookingWhereInput, skip: number, take: number): Promise<Booking[]> {
		return await prisma.booking.findMany({
			where,
			skip,
			take,
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	/**
	 * Find booking by ID
	 */
	async findById(id: number): Promise<Booking | null> {
		return await prisma.booking.findUnique({
			where: { id },
		});
	}

	/**
	 * Find booking by ID with room and property details
	 */
	async findByIdWithDetails(id: number) {
		return await prisma.booking.findUnique({
			where: { id },
			include: {
				room: {
					include: {
						property: true,
					},
				},
			},
		});
	}

	/**
	 * Find overlapping bookings for a room
	 */
	async findOverlappingBookings(
		roomId: number,
		startDate: Date,
		endDate: Date
	): Promise<Booking | null> {
		return await prisma.booking.findFirst({
			where: {
				roomId,
				status: {
					in: ['pending', 'approved'],
				},
				OR: [
					{
						AND: [
							{ startDate: { lte: startDate } },
							{ endDate: { gte: startDate } },
						],
					},
					{
						AND: [
							{ startDate: { lte: endDate } },
							{ endDate: { gte: endDate } },
						],
					},
					{
						AND: [
							{ startDate: { gte: startDate } },
							{ endDate: { lte: endDate } },
						],
					},
				],
			},
		});
	}

	/**
	 * Create booking
	 */
	async create(data: {
		studentId: number;
		roomId: number;
		startDate: Date;
		endDate: Date;
		status?: string;
	}): Promise<Booking> {
		return await prisma.booking.create({
			data: {
				studentId: data.studentId,
				roomId: data.roomId,
				startDate: data.startDate,
				endDate: data.endDate,
				status: (data.status || 'pending') as any,
			},
		});
	}

	/**
	 * Update booking
	 */
	async update(id: number, data: {
		startDate?: Date;
		endDate?: Date;
		status?: string;
	}): Promise<Booking> {
		return await prisma.booking.update({
			where: { id },
			data: data as any,
		});
	}

	/**
	 * Delete booking
	 */
	async delete(id: number): Promise<void> {
		await prisma.booking.delete({
			where: { id },
		});
	}
}
