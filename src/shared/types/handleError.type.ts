export type ApiErrors = Record<string, { message: string }>;

export interface HandleError {
	type: string;
	status: number;
	errors: ApiErrors;
}
