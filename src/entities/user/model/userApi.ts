import { $api } from '@shared/api/instance';
import type { ChangePasswordPayload, EditUserPayload } from './userTypes';

export async function getUser() {
	const response = await $api.get(`/users`);
	return response.data;
}

export async function logoutUser() {
	const response = await $api.post(`/users/logout`);
	return response.data;
}

export async function editUser(data: EditUserPayload) {
	const response = await $api.patch(`/users`, data.payload);
	return response.data;
}

export async function requestTwoFactorSwitch() {
	const response = await $api.get(`/users/2fa/switch/request`);
	return response.data;
}

export async function requestPasswordChange(data: ChangePasswordPayload) {
	const response = await $api.post(`/users/password/change_request`, data);
	return response.data;
}
