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
import { BookingService } from "./booking.service";
import type {
	CreateBookingRequest,
	UpdateBookingRequest,
	BookingResponse,
	BookingListRequest,
} from "./booking.dto";

@Route("bookings")
@Tags("Booking")
export class BookingController extends Controller {
	private bookingService: BookingService;

	constructor() {
		super();
		this.bookingService = new BookingService();
	}

	/**
	 * List bookings with filters
	 */
	@Get("/")
	@SuccessResponse("200", "OK")
	public async list(
		@Query() studentId?: number,
		@Query() roomId?: number,
		@Query() propertyId?: number,
		@Query() status?: 'pending' | 'approved' | 'rejected' | 'cancelled',
		@Query() page: number = 1,
		@Query() limit: number = 20
	): Promise<BookingResponse[]> {
		const filters: BookingListRequest = {
			studentId,
			roomId,
			propertyId,
			status,
			page,
			limit,
		};
		return await this.bookingService.listBookings(filters);
	}

	/**
	 * Get booking by ID
	 */
	@Get("{id}")
	@SuccessResponse("200", "OK")
	@Response("404", "Not Found")
	public async getById(@Path() id: number): Promise<BookingResponse> {
		try {
			return await this.bookingService.getBookingById(id);
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Booking not found");
		}
	}

	/**
	 * Create a new booking
	 */
	@Post("/")
	@SuccessResponse("201", "Created")
	@Response("400", "Bad Request")
	public async create(
		@Body() body: CreateBookingRequest
	): Promise<BookingResponse> {
		try {
			const result = await this.bookingService.createBooking(body);
			this.setStatus(201);
			return result;
		} catch (error: any) {
			this.setStatus(400);
			throw new Error(error.message || "Failed to create booking");
		}
	}

	/**
	 * Update booking
	 */
	@Put("{id}")
	@SuccessResponse("200", "Updated")
	@Response("404", "Not Found")
	public async update(
		@Path() id: number,
		@Body() body: UpdateBookingRequest
	): Promise<BookingResponse> {
		try {
			return await this.bookingService.updateBooking(id, body);
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Booking not found");
		}
	}

	/**
	 * Confirm (approve) a booking
	 */
	@Post("{id}/confirm")
	@SuccessResponse("200", "Confirmed")
	@Response("404", "Not Found")
	@Response("400", "Bad Request")
	public async confirm(@Path() id: number): Promise<BookingResponse> {
		try {
			return await this.bookingService.confirmBooking(id);
		} catch (error: any) {
			if (error.message === "Booking not found") {
				this.setStatus(404);
			} else {
				this.setStatus(400);
			}
			throw error;
		}
	}

	/**
	 * Reject a booking
	 */
	@Post("{id}/reject")
	@SuccessResponse("200", "Rejected")
	@Response("404", "Not Found")
	@Response("400", "Bad Request")
	public async reject(@Path() id: number): Promise<BookingResponse> {
		try {
			return await this.bookingService.rejectBooking(id);
		} catch (error: any) {
			if (error.message === "Booking not found") {
				this.setStatus(404);
			} else {
				this.setStatus(400);
			}
			throw error;
		}
	}

	/**
	 * Cancel a booking
	 */
	@Post("{id}/cancel")
	@SuccessResponse("200", "Cancelled")
	@Response("404", "Not Found")
	@Response("400", "Bad Request")
	public async cancel(@Path() id: number): Promise<BookingResponse> {
		try {
			return await this.bookingService.cancelBooking(id);
		} catch (error: any) {
			if (error.message === "Booking not found") {
				this.setStatus(404);
			} else {
				this.setStatus(400);
			}
			throw error;
		}
	}

	/**
	 * Delete booking
	 */
	@Delete("{id}")
	@SuccessResponse("200", "Deleted")
	@Response("404", "Not Found")
	public async remove(@Path() id: number): Promise<{ success: boolean }> {
		try {
			await this.bookingService.deleteBooking(id);
			return { success: true };
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Booking not found");
		}
	}
}
