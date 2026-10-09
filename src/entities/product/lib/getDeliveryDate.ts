import { formatDate } from '@shared/utils/formatDate';
import type { Product } from '../model/productTypes';

export const getDeliveryDate = (product: Product) => {
	const { delivery_date: deliveryDate } = product;
	const today = new Date().toISOString().slice(0, 10);

	if (!deliveryDate || deliveryDate.slice(0, 10) < today) return '';

	return formatDate(deliveryDate, 'dayMonth');
};
