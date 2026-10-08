import axios from 'axios';
import { SERVER_URL } from '@shared/config/env';
import type { ApiErrors, HandleError } from '@shared/types/handleError.type';
import { getToken } from './token';

export const $api = axios.create({
	baseURL: SERVER_URL,
	timeout: 10000
});

const isRecord = (value: unknown): value is Record<string, unknown> =>
	typeof value === 'object' && value !== null;

const normalizeApiErrors = (data: unknown): ApiErrors => {
	if (!isRecord(data)) return {};

	if (Array.isArray(data.validation_errors)) {
		return data.validation_errors.reduce<ApiErrors>((acc, item) => {
			if (!isRecord(item)) return acc;

			const [entry] = Object.entries(item);
			if (entry) {
				const [key, value] = entry;
				acc[key] = value as { message: string };
			}
			return acc;
		}, {});
	}

	if (typeof data.message !== 'string') return {};

	return {
		[typeof data.field === 'string' ? data.field : '_form']: {
			message: data.message
		}
	};
};

$api.interceptors.request.use(config => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

$api.interceptors.response.use(
	response => response,
	error => {
		// Сети нет или запрос не дошёл до сервера — отдаём исходную ошибку
		if (!error.response) {
			return Promise.reject(error);
		}

		const { status, data } = error.response;

		const handledError: HandleError = {
			type: 'API_ERROR',
			status,
			errors: normalizeApiErrors(data)
		};

		return Promise.reject(handledError);
	}
);
