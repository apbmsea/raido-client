import { $api } from '@shared/api/instance';
import type { ConfirmPayload, ConfirmType } from '..';

const CONFIRM_URLS: Record<ConfirmType, string> = {
	register: '/users/register/confirm',
	login: '/users/login/confirm',
	'2fa/switch': '/users/2fa/switch/confirm',
	'password/change': '/users/password/change_confirm'
};

export async function confirm({ url, email, code }: ConfirmPayload) {
	// Переключение 2FA привязано к текущей сессии, почта в запросе не нужна
	const response = await $api.post(
		CONFIRM_URLS[url],
		url === '2fa/switch' ? { code } : { email, code }
	);
	return response.data;
}
