import type { ApiErrors } from '@shared/types/handleError.type';

export const getFormError = (errors: ApiErrors, fieldNames: string[]) =>
	Object.entries(errors).find(([key]) => !fieldNames.includes(key))?.[1]
		.message;
