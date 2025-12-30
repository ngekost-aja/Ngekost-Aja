export interface CreateReviewRequest {
	userId: number;
	propertyId: number;
	rating: number; // 1-5
	comment?: string;
}

export interface UpdateReviewRequest {
	rating?: number;
	comment?: string;
}

export interface ReviewResponse {
	id: number;
	userId: number;
	propertyId: number;
	rating: number;
	comment: string;
	createdAt: Date;
}

export interface ReviewListRequest {
	propertyId?: number;
	userId?: number;
	minRating?: number;
	maxRating?: number;
	page?: number;
	limit?: number;
}

export interface ReviewStatsResponse {
	propertyId: number;
	averageRating: number;
	totalReviews: number;
}
