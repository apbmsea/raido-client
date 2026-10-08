import { $api } from '@shared/api/instance';
import type {
	ChangePasswordPayload,
	EditUserPayload,
	UserType
} from '../model/userTypes';

export async function getUser() {
	const response = await $api.get<UserType>('/users');
	return response.data;
}

export async function logoutUser() {
	await $api.post('/users/logout');
}

export async function editUser(data: EditUserPayload) {
	await $api.patch('/users', data);
}

export async function requestTwoFactorSwitch() {
	await $api.get('/users/2fa/switch/request');
}

export async function requestPasswordChange(data: ChangePasswordPayload) {
	await $api.post('/users/password/change_request', data);
}
