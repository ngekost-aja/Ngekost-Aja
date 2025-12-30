import payments from "@/repositories/payments";
import Payment from "@/models/Payment";
import {
	Body,
	Controller,
	Post,
	Route,
	Tags,
	Response,
	SuccessResponse,
	Get,
	Path,
	Query,
} from "tsoa";

@Route("payments")
@Tags("Payment")
export class PaymentController extends Controller {
	/**
	 * List payments with optional filters
	 */
	@Get("/")
	@SuccessResponse("200", "OK")
	@Response("400", "Bad Request")
	public async list(
		@Query() bookingId?: number,
		@Query() status?: string,
		@Query() paymentMethod?: string,
		@Query() page: number = 1,
		@Query() limit: number = 20
	): Promise<Payment[]> {
		let result = payments.slice();

		if (bookingId != null) {
			result = result.filter((p) => Number(p.bookingId) === Number(bookingId));
		}

		if (status) {
			const s = status.toLowerCase();
			result = result.filter((p) => p.status.toLowerCase() === s);
		}

		if (paymentMethod) {
			const m = paymentMethod.toLowerCase();
			result = result.filter((p) => p.paymentMethod.toLowerCase() === m);
		}

		const start = (page - 1) * limit;
		return result.slice(start, start + limit);
	}

	/**
	 * Get payment by id
	 */
	@Get("{id}")
	@SuccessResponse("200", "OK")
	@Response("404", "Not Found")
	public async getById(@Path() id: number): Promise<Payment> {
		const p = payments.find((x) => Number(x.id) === Number(id));
		if (!p) {
			this.setStatus(404);
			throw new Error("Payment not found");
		}
		return p;
	}

	/**
	 * Create (simulate) a payment
	 * Body: { bookingId, paymentMethod, amount }
	 */
	@Post("/")
	@SuccessResponse("201", "Created")
	@Response("400", "Bad Request")
	public async create(
		@Body()
		payload: {
			bookingId: number;
			paymentMethod: string;
			amount: number;
		}
	): Promise<Payment> {
		if (
			!payload ||
			!payload.bookingId ||
			!payload.paymentMethod ||
			!(payload.amount >= 0)
		) {
			this.setStatus(400);
			throw new Error("bookingId, paymentMethod and amount are required");
		}

		// generate next id
		const nextId = payments.length
			? Math.max(...payments.map((p) => p.id)) + 1
			: 1;

		// simple simulation: if method contains "fail" or amount is 0 => failed, otherwise paid
		const lowerMethod = payload.paymentMethod.toLowerCase();
		const simulatedStatus =
			lowerMethod.includes("fail") || payload.amount === 0 ? "failed" : "paid";

		const newPayment: Payment = {
			id: nextId,
			bookingId: payload.bookingId,
			paymentMethod: payload.paymentMethod,
			amount: payload.amount,
			status: simulatedStatus,
			transactionDate: new Date().toISOString(),
		};

		payments.push(newPayment);
		this.setStatus(201);
		return newPayment;
	}

	/**
	 * Refund a payment (simulate)
	 */
	@Post("{id}/refund")
	@SuccessResponse("200", "Refunded")
	@Response("404", "Not Found")
	@Response("400", "Bad Request")
	public async refund(
		@Path() id: number
	): Promise<{ success: boolean; payment?: Payment }> {
		const idx = payments.findIndex((p) => Number(p.id) === Number(id));
		if (idx === -1) {
			this.setStatus(404);
			throw new Error("Payment not found");
		}

		const p = payments[idx];

		if (p.status === "refunded") {
			this.setStatus(400);
			throw new Error("Payment already refunded");
		}

		if (p.status !== "paid") {
			this.setStatus(400);
			throw new Error("Only paid payments can be refunded");
		}

		p.status = "refunded";
		p.transactionDate = new Date().toISOString();
		payments[idx] = p;

		return { success: true, payment: p };
	}
}
