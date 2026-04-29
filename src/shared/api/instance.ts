import type { HandleError } from '@shared/types/handleError.type';
import axios from 'axios';

export const $api = axios.create({
	baseURL:
		import.meta.env.VITE_SERVER_URL ||
		'https://apiraido.merlant.xyz/internal_layer/api/v1/',
	timeout: 10000
});

const normalizeApiErrors = (data: any): Record<string, { message: string }> => {
	if (Array.isArray(data?.validation_errors)) {
		return data.validation_errors.reduce(
			(acc: Record<string, { message: string }>, item: any) => {
				const [key, value] = Object.entries(item)[0];
				acc[key] = value as { message: string };
				return acc;
			},
			{}
		);
	}

	if (data?.field && data?.message) {
		return {
			[data.field]: {
				message: data.message
			}
		};
	}

	if (data?.message) {
		return {
			_form: {
				message: data.message
			}
		};
	}

	return {};
};

$api.interceptors.response.use(
	response => response,
	async error => {
		if (!error.response) {
			return Promise.reject(error);
		}

		const { status, data } = error.response;

		if (status === 400 || status === 422) {
			const handledError: HandleError = {
				type: 'API_ERROR',
				status,
				errors: normalizeApiErrors(data)
			};

			return Promise.reject(handledError);
		}

		switch (status) {
			case 401:
				break;
			case 403:
				console.warn('Доступ запрещён');
				break;
			case 404:
				console.warn('Ресурс не найден');
				break;
			case 500:
				console.error('Ошибка сервера');
				break;
		}

		return Promise.reject(error);
	}
);
