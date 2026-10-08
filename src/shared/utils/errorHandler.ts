import type { ApiErrors, HandleError } from '@shared/types/handleError.type';

export const isApiError = (error: unknown): error is HandleError => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'type' in error &&
		'status' in error &&
		'errors' in error
	);
};

/**
 * Ошибки ответа сервера по полям. Если сервер ничего не объяснил,
 * возвращает общую ошибку формы с запасным текстом
 */
export const getApiErrors = (error: unknown, fallback: string): ApiErrors =>
	isApiError(error) && Object.keys(error.errors).length > 0
		? error.errors
		: { _form: { message: fallback } };
