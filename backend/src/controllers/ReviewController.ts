import reviews from "@/repositories/reviews";
import Review from "@/models/Review";
import houses from "@/repositories/houses";
import {
  Body,
  Controller,
  Post,
  Put,
  Route,
  Tags,
  Response,
  SuccessResponse,
  Get,
  Path,
  Query,
} from "tsoa";

@Route("reviews")
@Tags("Review")
export class ReviewController extends Controller {
  /**
   * List reviews with optional filters
   * Example: GET /reviews?houseId=1&userId=2&minRating=3&page=1&limit=20
   */
  @Get("/")
  @SuccessResponse("200", "OK")
  @Response("400", "Bad Request")
  public async list(
    @Query() houseId?: number,
    @Query() userId?: number,
    @Query() minRating?: number,
    @Query() maxRating?: number,
    @Query() page: number = 1,
    @Query() limit: number = 20
  ): Promise<Review[]> {
    let result = reviews.slice();

    if (houseId != null) {
      result = result.filter((r) => Number(r.houseId) === Number(houseId));
    }

    if (userId != null) {
      result = result.filter((r) => Number(r.userId) === Number(userId));
    }

    if (minRating != null) {
      result = result.filter((r) => Number(r.rating) >= Number(minRating));
    }

    if (maxRating != null) {
      result = result.filter((r) => Number(r.rating) <= Number(maxRating));
    }

    // newest first
    result.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const start = (page - 1) * limit;
    return result.slice(start, start + limit);
  }

  /**
   * Get single review by id
   */
  @Get("{id}")
  @SuccessResponse("200", "OK")
  @Response("404", "Not Found")
  public async getById(@Path() id: number): Promise<Review> {
    const r = reviews.find((x) => Number(x.id) === Number(id));
    if (!r) {
      this.setStatus(404);
      throw new Error("Review not found");
    }
    return r;
  }

  /**
   * Create a review for a house (ideally after booking)
   * Body: { userId, houseId, rating, comment, createdAt? }
   * Note: This uses a lightweight validation. In a real app verify booking/payment.
   */
  @Post("/")
  @SuccessResponse("201", "Created")
  @Response("400", "Bad Request")
  public async create(
    @Body()
    payload: {
      userId: number;
      houseId: number;
      rating: number;
      comment?: string;
      createdAt?: string;
    }
  ): Promise<Review> {
    if (
      !payload ||
      payload.userId == null ||
      payload.houseId == null ||
      payload.rating == null ||
      Number.isNaN(Number(payload.rating))
    ) {
      this.setStatus(400);
      throw new Error("userId, houseId and rating are required");
    }

    const rating = Number(payload.rating);
    if (rating < 1 || rating > 5) {
      this.setStatus(400);
      throw new Error("rating must be between 1 and 5");
    }

    // basic house existence check
    const houseExists = houses.find(
      (h) => Number((h as any).id) === Number(payload.houseId)
    );
    if (!houseExists) {
      this.setStatus(400);
      throw new Error("houseId is invalid");
    }

    const nextId = reviews.length
      ? Math.max(...reviews.map((r) => r.id)) + 1
      : 1;
    const now = payload.createdAt
      ? new Date(payload.createdAt).toISOString()
      : new Date().toISOString();

    const newReview: Review = {
      id: nextId,
      userId: Number(payload.userId),
      houseId: Number(payload.houseId),
      rating,
      comment: payload.comment ? String(payload.comment) : "",
      createdAt: now,
    };

    reviews.push(newReview);
    this.setStatus(201);
    return newReview;
  }

  /**
   * Update a review (user can edit their review)
   */
  @Put("{id}")
  @SuccessResponse("200", "Updated")
  @Response("404", "Not Found")
  @Response("400", "Bad Request")
  public async update(
    @Path() id: number,
    @Body() payload: Partial<Review>
  ): Promise<Review> {
    const idx = reviews.findIndex((r) => Number(r.id) === Number(id));
    if (idx === -1) {
      this.setStatus(404);
      throw new Error("Review not found");
    }

    if (payload.rating != null) {
      const r = Number(payload.rating);
      if (Number.isNaN(r) || r < 1 || r > 5) {
        this.setStatus(400);
        throw new Error("rating must be between 1 and 5");
      }
      reviews[idx].rating = r;
    }

    if (payload.comment != null) {
      reviews[idx].comment = String(payload.comment);
    }

    // Do not allow changing userId/houseId/createdAt via this endpoint
    return reviews[idx];
  }

  /**
   * Delete a review (removes entry)
   */
  @Post("{id}/delete")
  @SuccessResponse("200", "Deleted")
  @Response("404", "Not Found")
  public async remove(@Path() id: number): Promise<{ success: boolean }> {
    const idx = reviews.findIndex((r) => Number(r.id) === Number(id));
    if (idx === -1) {
      this.setStatus(404);
      throw new Error("Review not found");
    }
    reviews.splice(idx, 1);
    return { success: true };
  }

  /**
   * Get review stats for a house (average rating and count)
   * Example: GET /reviews/house/1/stats
   */
  @Get("house/{houseId}/stats")
  @SuccessResponse("200", "OK")
  @Response("404", "Not Found")
  public async houseStats(
    @Path() houseId: number
  ): Promise<{ houseId: number; averageRating: number; count: number }> {
    const list = reviews.filter((r) => Number(r.houseId) === Number(houseId));
    if (!list.length) {
      this.setStatus(404);
      throw new Error("No reviews for this house");
    }
    const count = list.length;
    const sum = list.reduce((s, r) => s + Number(r.rating), 0);
    const averageRating = Math.round((sum / count) * 10) / 10; // one decimal
    return { houseId: Number(houseId), averageRating, count };
  }
}
