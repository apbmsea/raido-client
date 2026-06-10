export interface GetReviewsPayload {
	productId: number;
}

export interface GetReviewsResponse {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	items: ReviewType[];
}

export interface AddReviewsPayload {
	productId: number;
	payload: {
		rating: number;
		comment: string;
		is_anonymous: boolean;
	};
}

export interface ReviewType {
	id: number;
	product_id: number;
	rating: number;
	comment: string;
	created_at: string;
	updated_at: string;
	first_name: string;
	last_name: string;
}
