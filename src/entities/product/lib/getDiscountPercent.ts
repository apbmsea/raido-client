import type { Product } from '../model/productTypes';

export const getDiscountPercent = (product: Product) => {
	const percent = Math.round(Number(product.discount_percentage));

	return product.has_discount && percent > 0 ? percent : null;
};
