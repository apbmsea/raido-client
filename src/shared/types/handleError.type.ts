export interface HandleError {
	type: string;
	status: number;
	errors: Record<string, { message: string }>;
}
