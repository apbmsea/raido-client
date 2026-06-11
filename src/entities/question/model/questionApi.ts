import { $api } from '@shared/api/instance';
import type { AskQuestionsPayload, GetQuestionsPayload } from './questionType';

export async function getQuestions(data: GetQuestionsPayload) {
	const response = await $api.get(`/questions/${data.productId}`);
	return response.data;
}

export async function askQuestion(data: AskQuestionsPayload) {
	await $api.post(`/questions/${data.productId}`, data.payload);
}
