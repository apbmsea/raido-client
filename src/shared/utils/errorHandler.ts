import type { HandleError } from "@shared/types/handleError.type";

export const isApiError = (error: unknown): error is HandleError => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'type' in error &&
		'status' in error &&
		'errors' in error
	);
};
