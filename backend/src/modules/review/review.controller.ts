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
import { ReviewService } from "./review.service";
import type {
	CreateReviewRequest,
	UpdateReviewRequest,
	ReviewResponse,
	ReviewListRequest,
	ReviewStatsResponse,
} from "./review.dto";

@Route("reviews")
@Tags("Review")
export class ReviewController extends Controller {
	private reviewService: ReviewService;

	constructor() {
		super();
		this.reviewService = new ReviewService();
	}

	/**
	 * List reviews with filters
	 */
	@Get("/")
	@SuccessResponse("200", "OK")
	public async list(
		@Query() propertyId?: number,
		@Query() userId?: number,
		@Query() minRating?: number,
		@Query() maxRating?: number,
		@Query() page: number = 1,
		@Query() limit: number = 20
	): Promise<ReviewResponse[]> {
		const filters: ReviewListRequest = {
			propertyId,
			userId,
			minRating,
			maxRating,
			page,
			limit,
		};
		return await this.reviewService.listReviews(filters);
	}

	/**
	 * Get review by ID
	 */
	@Get("{id}")
	@SuccessResponse("200", "OK")
	@Response("404", "Not Found")
	public async getById(@Path() id: number): Promise<ReviewResponse> {
		try {
			return await this.reviewService.getReviewById(id);
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Review not found");
		}
	}

	/**
	 * Create a review
	 */
	@Post("/")
	@SuccessResponse("201", "Created")
	@Response("400", "Bad Request")
	public async create(
		@Body() body: CreateReviewRequest
	): Promise<ReviewResponse> {
		try {
			const result = await this.reviewService.createReview(body);
			this.setStatus(201);
			return result;
		} catch (error: any) {
			this.setStatus(400);
			throw new Error(error.message || "Failed to create review");
		}
	}

	/**
	 * Update review
	 */
	@Put("{id}")
	@SuccessResponse("200", "Updated")
	@Response("404", "Not Found")
	@Response("400", "Bad Request")
	public async update(
		@Path() id: number,
		@Body() body: UpdateReviewRequest
	): Promise<ReviewResponse> {
		try {
			return await this.reviewService.updateReview(id, body);
		} catch (error: any) {
			if (error.message === "Review not found") {
				this.setStatus(404);
			} else {
				this.setStatus(400);
			}
			throw error;
		}
	}

	/**
	 * Delete review
	 */
	@Delete("{id}")
	@SuccessResponse("200", "Deleted")
	@Response("404", "Not Found")
	public async remove(@Path() id: number): Promise<{ success: boolean }> {
		try {
			await this.reviewService.deleteReview(id);
			return { success: true };
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "Review not found");
		}
	}

	/**
	 * Get review statistics for a property
	 */
	@Get("property/{propertyId}/stats")
	@SuccessResponse("200", "OK")
	@Response("404", "Not Found")
	public async getPropertyStats(
		@Path() propertyId: number
	): Promise<ReviewStatsResponse> {
		try {
			return await this.reviewService.getPropertyStats(propertyId);
		} catch (error: any) {
			this.setStatus(404);
			throw new Error(error.message || "No reviews found");
		}
	}
}
