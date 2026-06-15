import { $api } from '@shared/api/instance';
import type { EditUserPayload } from './userTypes';

export async function getUser() {
	const response = await $api.get(`/users`);
	return response.data;
}

export async function editUser(data: EditUserPayload) {
	const response = await $api.patch(`/users`, data.payload);
	return response.data;
}

