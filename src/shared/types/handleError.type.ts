/** Ошибки по ключу поля формы; `_form` — ошибка без привязки к полю */
export type ApiErrors = Record<string, { message: string }>;

export interface HandleError {
	type: string;
	status: number;
	errors: ApiErrors;
}
