export type RatingLevel = 1 | 2 | 3 | 4 | 5;

export interface ReviewType {
	id: number;
	product_id: number;
	rating: number;
	comment: string;
	created_at: string;
	updated_at: string;
	first_name: string | null;
	last_name: string | null;
}

export interface GetReviewsResponse {
	total: number;
	rating: number;
	counts_of_reviews: Record<RatingLevel, number>;
	items: ReviewType[];
}

export interface AddReviewPayload {
	productId: number;
	payload: {
		rating: number;
		comment: string;
		is_anonymous: boolean;
	};
}
