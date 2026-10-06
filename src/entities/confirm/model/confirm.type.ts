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
