import { prisma } from "@/lib/prisma";
import type { Payment, ActivityLog, Prisma } from "@/generated/prisma/client";

export class ReportingRepository {
	// ============ PAYMENT OPERATIONS ============

	/**
	 * Find payments with filters
	 */
	async findPayments(where: Prisma.PaymentWhereInput, skip: number, take: number): Promise<Payment[]> {
		return await prisma.payment.findMany({
			where,
			skip,
			take,
			orderBy: {
				id: 'desc',
			},
		});
	}

	/**
	 * Find payment by ID
	 */
	async findPaymentById(id: number): Promise<Payment | null> {
		return await prisma.payment.findUnique({
			where: { id },
		});
	}

	/**
	 * Create payment
	 */
	async createPayment(data: {
		bookingId: number;
		amount: number;
		paymentMethod: string;
		status?: string;
		paidAt?: Date | null;
	}): Promise<Payment> {
		return await prisma.payment.create({
			data: {
				bookingId: data.bookingId,
				amount: data.amount,
				paymentMethod: data.paymentMethod,
				status: (data.status || 'pending') as any,
				paidAt: data.paidAt,
			},
		});
	}

	/**
	 * Update payment
	 */
	async updatePayment(id: number, data: {
		status?: string;
		paidAt?: Date;
	}): Promise<Payment> {
		return await prisma.payment.update({
			where: { id },
			data: data as any,
		});
	}

	// ============ ACTIVITY LOG OPERATIONS ============

	/**
	 * Find activity logs with filters
	 */
	async findActivityLogs(where: Prisma.ActivityLogWhereInput, skip: number, take: number): Promise<ActivityLog[]> {
		return await prisma.activityLog.findMany({
			where,
			skip,
			take,
			orderBy: {
				createdAt: 'desc',
			},
		});
	}

	/**
	 * Create activity log
	 */
	async createActivityLog(data: {
		userId: number;
		action: string;
		entityType: string;
		entityId: number;
	}): Promise<ActivityLog> {
		return await prisma.activityLog.create({
			data: {
				userId: data.userId,
				action: data.action,
				entityType: data.entityType,
				entityId: data.entityId,
			},
		});
	}

	/**
	 * Delete old activity logs
	 */
	async deleteOldLogs(cutoffDate: Date): Promise<number> {
		const result = await prisma.activityLog.deleteMany({
			where: {
				createdAt: {
					lt: cutoffDate,
				},
			},
		});

		return result.count;
	}
}
