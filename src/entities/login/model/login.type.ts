export interface LoginPayload {
	email: string;
	password: string;
	is_corporate: boolean;
}

export type LoginResponse =
	| { isConfirmRequired: true }
	| { isConfirmRequired: false; token: string };
