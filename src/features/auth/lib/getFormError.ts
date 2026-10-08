import type { ApiErrors } from '@shared/types/handleError.type';

/**
 * Текст первой ошибки, которая не относится к полям формы
 * и поэтому показывается общим сообщением под ними
 */
export const getFormError = (errors: ApiErrors, fieldNames: string[]) =>
	Object.entries(errors).find(([key]) => !fieldNames.includes(key))?.[1]
		.message;
