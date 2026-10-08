import type { Paginated } from '@shared/utils/pagination';

export interface QuestionType {
	id: number;
	product_id: number;
	comment: string;
	created_at: string;
	first_name: string | null;
	last_name: string | null;
	answer: string | null;
}

export type GetQuestionsResponse = Paginated<QuestionType>;

export interface AskQuestionPayload {
	productId: number;
	payload: {
		comment: string;
		is_anonymous: boolean;
	};
}
