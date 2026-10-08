const FORMATS = {
	/** 31 июля */
	dayMonth: { day: 'numeric', month: 'long' },
	/** 31 июля 2026 г. */
	full: { day: 'numeric', month: 'long', year: 'numeric' },
	/** 31 июля 2026 г. в 17:12 */
	dateTime: {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}
} satisfies Record<string, Intl.DateTimeFormatOptions>;

/**
 * Преобразует ISO строку в дату на русском. Для пустой или некорректной
 * строки возвращает пустую строку
 */
export const formatDate = (
	isoString: string | null | undefined,
	format: keyof typeof FORMATS = 'full'
): string => {
	if (!isoString) return '';

	const date = new Date(isoString);
	if (Number.isNaN(date.getTime())) return '';

	return new Intl.DateTimeFormat('ru-RU', FORMATS[format]).format(date);
};
