import { $api } from '@shared/api/instance';
import type {
	AskQuestionPayload,
	GetQuestionsResponse
} from '../model/questionTypes';

export async function getQuestions(productId: number, page = 1) {
	const response = await $api.get<GetQuestionsResponse>(
		`/questions/${productId}`,
		{ params: { page } }
	);
	return response.data;
}

export async function askQuestion({ productId, payload }: AskQuestionPayload) {
	await $api.post(`/questions/${productId}`, payload);
}
