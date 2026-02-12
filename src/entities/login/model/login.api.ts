import { $api } from '@shared/api/instance';
import type { LoginPayload } from '..';

export async function login(data: LoginPayload) {
	const response = await $api.post('/users/login/request', data);
	return response.data;
}
