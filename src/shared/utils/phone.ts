export const PHONE_LENGTH = 10;

/**
 * Оставляет только 10 цифр номера без кода страны
 */
export const normalizePhone = (value: string | null | undefined) => {
	const digits = (value || '').replace(/\D/g, '');
	return digits.length === 11 && /^[78]/.test(digits)
		? digits.slice(1)
		: digits.slice(0, PHONE_LENGTH);
};

/**
 * Преобразует цифры номера в формат "999 999-99-99"
 */
export const formatPhone = (digits: string) => {
	const first = digits.slice(0, 3);
	const second = digits.slice(3, 6);
	const third = digits.slice(6, 8);
	const fourth = digits.slice(8, 10);
	return `${first}${second ? ` ${second}` : ''}${third ? `-${third}` : ''}${fourth ? `-${fourth}` : ''}`;
};
