export interface LoginPayload {
	email: string;
	password: string;
	is_corporate: boolean;
}

export type LoginResponse =
	| { isConfirmRequired: true }
	| { isConfirmRequired: false; token: string };

export interface RegisterPayload {
	email: string;
	password: string;
	is_corporate: boolean;
}

export type ConfirmType =
	| 'register'
	| 'login'
	| '2fa/switch'
	| 'password/change';

export interface ConfirmPayload {
	email: string;
	code: string;
	url: ConfirmType;
}
