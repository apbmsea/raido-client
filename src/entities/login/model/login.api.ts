import { $api } from '@shared/api/instance';
import type { LoginPayload, LoginResponse } from '..';

export async function login(data: LoginPayload): Promise<LoginResponse> {
	const response = await $api.post('/users/login', data);

	// 202 — у пользователя включена 2FA: токена ещё нет, вход подтверждается кодом из письма
	return response.status === 202
		? { isConfirmRequired: true }
		: { isConfirmRequired: false, token: response.data.token };
}
