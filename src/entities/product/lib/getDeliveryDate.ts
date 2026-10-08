import { formatDate } from '@shared/utils/formatDate';
import type { Product } from '../model/productTypes';

/**
 * Дата доставки для показа («9 июля») или пустая строка, если она
 * не указана либо уже прошла
 */
export const getDeliveryDate = (product: Product) => {
	const { delivery_date: deliveryDate } = product;
	const today = new Date().toISOString().slice(0, 10);

	// Даты приходят в формате ГГГГ-ММ-ДД, поэтому сравниваются как строки
	if (!deliveryDate || deliveryDate.slice(0, 10) < today) return '';

	return formatDate(deliveryDate, 'dayMonth');
};
