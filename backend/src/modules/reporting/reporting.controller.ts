import {
	Body,
	Controller,
	Delete,
	Get,
	Path,
	Post,
	Put,
	Query,
	Response,
	Route,
	SuccessResponse,
	Tags,
} from "tsoa";
import { ReportingService } from "./reporting.service";
import type {
	CreatePaymentRequest,
	UpdatePaymentRequest,
	PaymentResponse,
	PaymentListRequest,
	CreateActivityLogRequest,
	ActivityLogResponse,
	ActivityLogListRequest,
} from "./reporting.dto";

@Route("payments")
@Tags("Payment")
export class PaymentController extends Controller {
	private reportingService: ReportingService;

	constructor() {
		super();
		this.reportingService = new ReportingService();
	}

	/**
	 * List payments with filters
	 */
	@Get("/")
	@SuccessResponse("200", "OK")
	public async list(
		@Query() bookingId?: number,
		@Query() status?: 'pending' | 'paid' | 'failed',
		@Query() paymentMethod?: string,
		@Query() page: number = 1,
		@Query() limit: number = 20
	): Promise<PaymentResponse[]> {
		const filters: PaymentListRequest = {
			bookingId,
			status,
			paymentMethod,
			page,
			limit,
		};
		return await this.reportingService.listPayments(filters);
	}

	/**
	 * Get payment by ID
	 */
	@Get("{id}")
	@SuccessResponse("200", "OK")
	@Response("404", "Not Found")
	public async getById(@Path() id: number): Promise<PaymentResponse> {
		try {
			return await this.reportingService.getPaymentById(id);
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Payment not found");
		}
	}

	/**
	 * Create a payment
	 */
	@Post("/")
	@SuccessResponse("201", "Created")
	@Response("400", "Bad Request")
	public async create(
		@Body() body: CreatePaymentRequest
	): Promise<PaymentResponse> {
		try {
			const result = await this.reportingService.createPayment(body);
			this.setStatus(201);
			return result;
		} catch (error: any) {
			this.setStatus(400);
			throw new Error(error.message || "Failed to create payment");
		}
	}

	/**
	 * Update payment
	 */
	@Put("{id}")
	@SuccessResponse("200", "Updated")
	@Response("404", "Not Found")
	public async update(
		@Path() id: number,
		@Body() body: UpdatePaymentRequest
	): Promise<PaymentResponse> {
		try {
			return await this.reportingService.updatePayment(id, body);
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Payment not found");
		}
	}

	/**
	 * Process payment (mark as paid)
	 */
	@Post("{id}/process")
	@SuccessResponse("200", "Processed")
	@Response("404", "Not Found")
	@Response("400", "Bad Request")
	public async process(@Path() id: number): Promise<PaymentResponse> {
		try {
			return await this.reportingService.processPayment(id);
		} catch (error: any) {
			if (error.message === "Payment not found") {
				this.setStatus(404);
			} else {
				this.setStatus(400);
			}
			throw error;
		}
	}
}

@Route("activity-logs")
@Tags("ActivityLog")
export class ActivityLogController extends Controller {
	private reportingService: ReportingService;

	constructor() {
		super();
		this.reportingService = new ReportingService();
	}

	/**
	 * List activity logs with filters
	 */
	@Get("/")
	@SuccessResponse("200", "OK")
	public async list(
		@Query() userId?: number,
		@Query() entityType?: string,
		@Query() entityId?: number,
		@Query() page: number = 1,
		@Query() limit: number = 50
	): Promise<ActivityLogResponse[]> {
		const filters: ActivityLogListRequest = {
			userId,
			entityType,
			entityId,
			page,
			limit,
		};
		return await this.reportingService.listActivityLogs(filters);
	}

	/**
	 * Create activity log
	 */
	@Post("/")
	@SuccessResponse("201", "Created")
	public async create(
		@Body() body: CreateActivityLogRequest
	): Promise<ActivityLogResponse> {
		const result = await this.reportingService.createActivityLog(body);
		this.setStatus(201);
		return result;
	}

	/**
	 * Delete old activity logs
	 */
	@Delete("cleanup")
	@SuccessResponse("200", "Deleted")
	public async cleanup(
		@Query() daysOld: number = 90
	): Promise<{ deletedCount: number }> {
		const count = await this.reportingService.deleteOldLogs(daysOld);
		return { deletedCount: count };
	}
}
