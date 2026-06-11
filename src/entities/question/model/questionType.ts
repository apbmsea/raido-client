export interface AskQuestionsPayload {
	productId: number;
	payload: {
		comment: string;
		is_anonymous: boolean;
	};
}

export interface GetQuestionsPayload {
	productId: number;
}

export interface GetQuestionsResponse {
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	items: QuestionType[];
}

export interface QuestionType {
	id: number;
	product_id: number;
	comment: string;
	created_at: string;
	first_name: string;
	last_name: string;
	answer: string;
}
