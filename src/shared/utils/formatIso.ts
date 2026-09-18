/**
 * Преобразует ISO строку в формат "31 июля"
 * @param isoString Строка даты в формате ISO 8601 (например, "2026-07-31T17:12:58.047608")
 */

export const formatIso = (isoString: string): string => {
	if (!isoString) return '';

	const date = new Date(isoString);

	if (isNaN(date.getTime())) {
		return 'Некорректная дата';
	}

	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long'
	}).format(date);
};
