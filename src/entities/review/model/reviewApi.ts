import { $api } from '@shared/api/instance';
import type { AddReviewsPayload, GetReviewsPayload } from './reviewTypes';

export async function getReviews(data: GetReviewsPayload) {
	const response = await $api.get(`/reviews/${data.productId}`);
	return response.data;
}

export async function addReview(data: AddReviewsPayload) {
	const response = await $api.post(`/reviews/${data.productId}`, data.payload);
	return response.data;
}
