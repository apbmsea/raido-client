import type { Product } from '../model/productTypes';

/** Процент скидки для показа или null, если скидки на товар нет */
export const getDiscountPercent = (product: Product) => {
	const percent = Math.round(Number(product.discount_percentage));

	return product.has_discount && percent > 0 ? percent : null;
};
