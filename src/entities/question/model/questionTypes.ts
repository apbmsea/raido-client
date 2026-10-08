export interface QuestionType {
	id: number;
	product_id: number;
	comment: string;
	created_at: string;
	first_name: string | null;
	last_name: string | null;
	answer: string | null;
}

export interface GetQuestionsResponse {
	total: number;
	items: QuestionType[];
}

export interface AskQuestionPayload {
	productId: number;
	payload: {
		comment: string;
		is_anonymous: boolean;
	};
}
