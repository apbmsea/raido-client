import { $api } from '@shared/api/instance';
import type { ConfirmPayload } from '..';

export async function confirm(data: ConfirmPayload) {
	const response = await $api.post(`/users/${data.url}/confirm`, data);
	return response.data;
}
