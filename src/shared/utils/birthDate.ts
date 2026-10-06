export const toDateInputValue = (value: string | null | undefined) => {
	const match = value?.match(/^\d{4}-\d{2}-\d{2}/);
	return match ? match[0] : '';
};

export const isValidBirthDate = (value: string) => {
	if (!value) return true;
	if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

	const date = new Date(`${value}T00:00:00.000Z`);
	return (
		!Number.isNaN(date.getTime()) &&
		date.toISOString().slice(0, 10) === value &&
		value <= new Date().toISOString().slice(0, 10)
	);
};
