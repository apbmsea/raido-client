import { $api } from '@shared/api/instance';
import type {
	ConfirmPayload,
	ConfirmType,
	LoginPayload,
	LoginResponse,
	RegisterPayload
} from '../model/authTypes';

const CONFIRM_URLS: Record<ConfirmType, string> = {
	register: '/users/register/confirm',
	login: '/users/login/confirm',
	'2fa/switch': '/users/2fa/switch/confirm',
	'password/change': '/users/password/change_confirm'
};

export async function login(data: LoginPayload): Promise<LoginResponse> {
	const response = await $api.post('/users/login', data);

	return response.status === 202
		? { isConfirmRequired: true }
		: { isConfirmRequired: false, token: response.data.token };
}

export async function register(data: RegisterPayload) {
	await $api.post('/users/register/request', data);
}

export async function confirm({ url, email, code }: ConfirmPayload) {
	const response = await $api.post<{ token?: string }>(
		CONFIRM_URLS[url],
		url === '2fa/switch' ? { code } : { email, code }
	);
	return response.data;
}
