const FORMATS = {
	dayMonth: { day: 'numeric', month: 'long' },
	full: { day: 'numeric', month: 'long', year: 'numeric' },
	dateTime: {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}
} satisfies Record<string, Intl.DateTimeFormatOptions>;

export const formatDate = (
	isoString: string | null | undefined,
	format: keyof typeof FORMATS = 'full'
): string => {
	if (!isoString) return '';

	const date = new Date(isoString);
	if (Number.isNaN(date.getTime())) return '';

	return new Intl.DateTimeFormat('ru-RU', FORMATS[format]).format(date);
};
