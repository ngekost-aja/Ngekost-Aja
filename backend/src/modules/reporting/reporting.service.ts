import { ReportingRepository } from "./reporting.repository";
import { prisma } from "@/lib/prisma";
import type {
	CreatePaymentRequest,
	UpdatePaymentRequest,
	PaymentResponse,
	PaymentListRequest,
	CreateActivityLogRequest,
	ActivityLogResponse,
	ActivityLogListRequest,
} from "./reporting.dto";

export class ReportingService {
	private repository: ReportingRepository;

	constructor() {
		this.repository = new ReportingRepository();
	}

	// ============ PAYMENT OPERATIONS ============

	/**
	 * List payments with filters
	 */
	async listPayments(filters: PaymentListRequest): Promise<PaymentResponse[]> {
		const { bookingId, status, paymentMethod, page = 1, limit = 20 } = filters;

		const where: any = {};
		if (bookingId) where.bookingId = bookingId;
		if (status) where.status = status;
		if (paymentMethod) where.paymentMethod = { contains: paymentMethod };

		const payments = await this.repository.findPayments(
			where,
			(page - 1) * limit,
			limit
		);

		return payments.map((p) => ({
			id: p.id,
			bookingId: p.bookingId,
			amount: Number(p.amount),
			paymentMethod: p.paymentMethod,
			status: p.status,
			paidAt: p.paidAt,
		}));
	}

	/**
	 * Get payment by ID
	 */
	async getPaymentById(id: number): Promise<PaymentResponse> {
		const payment = await this.repository.findPaymentById(id);
		if (!payment) throw new Error("Payment not found");

		return {
			id: payment.id,
			bookingId: payment.bookingId,
			amount: Number(payment.amount),
			paymentMethod: payment.paymentMethod,
			status: payment.status,
			paidAt: payment.paidAt,
		};
	}

	/**
	 * Create a payment
	 */
	async createPayment(data: CreatePaymentRequest): Promise<PaymentResponse> {
		// Verify booking exists
		const booking = await prisma.booking.findUnique({
			where: { id: data.bookingId },
		});

		if (!booking) throw new Error("Booking not found");

		const payment = await this.repository.createPayment({
			bookingId: data.bookingId,
			amount: data.amount,
			paymentMethod: data.paymentMethod,
			status: 'pending',
		});

		return {
			id: payment.id,
			bookingId: payment.bookingId,
			amount: Number(payment.amount),
			paymentMethod: payment.paymentMethod,
			status: payment.status,
			paidAt: payment.paidAt,
		};
	}

	/**
	 * Update payment
	 */
	async updatePayment(
		id: number,
		data: UpdatePaymentRequest
	): Promise<PaymentResponse> {
		const existing = await this.repository.findPaymentById(id);
		if (!existing) throw new Error("Payment not found");

		const payment = await this.repository.updatePayment(id, {
			...(data.status && { status: data.status }),
			...(data.paidAt && { paidAt: new Date(data.paidAt) }),
		});

		return {
			id: payment.id,
			bookingId: payment.bookingId,
			amount: Number(payment.amount),
			paymentMethod: payment.paymentMethod,
			status: payment.status,
			paidAt: payment.paidAt,
		};
	}

	/**
	 * Process payment (mark as paid)
	 */
	async processPayment(id: number): Promise<PaymentResponse> {
		const payment = await this.repository.findPaymentById(id);
		if (!payment) throw new Error("Payment not found");
		if (payment.status === 'paid') {
			throw new Error("Payment already processed");
		}

		const updated = await this.repository.updatePayment(id, {
			status: 'paid',
			paidAt: new Date(),
		});

		return {
			id: updated.id,
			bookingId: updated.bookingId,
			amount: Number(updated.amount),
			paymentMethod: updated.paymentMethod,
			status: updated.status,
			paidAt: updated.paidAt,
		};
	}

	// ============ ACTIVITY LOG OPERATIONS ============

	/**
	 * List activity logs with filters
	 */
	async listActivityLogs(
		filters: ActivityLogListRequest
	): Promise<ActivityLogResponse[]> {
		const { userId, entityType, entityId, page = 1, limit = 50 } = filters;

		const where: any = {};
		if (userId) where.userId = userId;
		if (entityType) where.entityType = entityType;
		if (entityId) where.entityId = entityId;

		return await this.repository.findActivityLogs(
			where,
			(page - 1) * limit,
			limit
		);
	}

	/**
	 * Create activity log
	 */
	async createActivityLog(
		data: CreateActivityLogRequest
	): Promise<ActivityLogResponse> {
		return await this.repository.createActivityLog({
			userId: data.userId,
			action: data.action,
			entityType: data.entityType,
			entityId: data.entityId,
		});
	}

	/**
	 * Delete old activity logs (cleanup)
	 */
	async deleteOldLogs(daysOld: number = 90): Promise<number> {
		const cutoffDate = new Date();
		cutoffDate.setDate(cutoffDate.getDate() - daysOld);

		return await this.repository.deleteOldLogs(cutoffDate);
	}
}
