const priceFormatter = new Intl.NumberFormat('ru-RU', {
	style: 'currency',
	currency: 'RUB',
	minimumFractionDigits: 0,
	maximumFractionDigits: 2
});

export const formatPrice = (price: number | string) =>
	priceFormatter.format(Number(price) || 0);
