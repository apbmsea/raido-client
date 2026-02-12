import { $api } from '@shared/api/instance';
import type { RegisterPayload } from '..';

export async function register(data: RegisterPayload) {
	const response = await $api.post('/users/register/request', data);
	return response.data;
}
