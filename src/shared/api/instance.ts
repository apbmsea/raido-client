import axios from 'axios';
import { SERVER_URL } from '@shared/config/env';
import type { ApiErrors, HandleError } from '@shared/types/handleError.type';
import { reportRequestDuration, reportRequestFailure } from './networkSpeed';
import { getToken } from './token';

declare module 'axios' {
	interface InternalAxiosRequestConfig {
		startedAt?: number;
	}
}

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

const reportDuration = (startedAt?: number) => {
	if (startedAt !== undefined) {
		reportRequestDuration(performance.now() - startedAt);
	}
};

$api.interceptors.request.use(config => {
	config.startedAt = performance.now();

	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

$api.interceptors.response.use(
	response => {
		reportDuration(response.config.startedAt);
		return response;
	},
	error => {
		if (!error.response) {
			if (!axios.isCancel(error)) reportRequestFailure();
			return Promise.reject(error);
		}

		reportDuration(error.config?.startedAt);

		const { status, data } = error.response;

		const handledError: HandleError = {
			type: 'API_ERROR',
			status,
			errors: normalizeApiErrors(data)
		};

		return Promise.reject(handledError);
	}
);
