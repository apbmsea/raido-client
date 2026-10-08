import { $api } from '@shared/api/instance';
import type { AddReviewPayload, GetReviewsResponse } from '../model/reviewTypes';

export async function getReviews(productId: number) {
	const response = await $api.get<GetReviewsResponse>(
		`/reviews/${productId}`
	);
	return response.data;
}

export async function addReview({ productId, payload }: AddReviewPayload) {
	await $api.post(`/reviews/${productId}`, payload);
}
