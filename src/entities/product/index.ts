import { actions, reducer, name } from './model/productSlice';

export { default as watchProduct } from './model/productSaga';
export { default as ProductCard } from './ui/ProductCard';
export { getProduct, getProducts } from './api/productApi';
export { getDeliveryDate } from './lib/getDeliveryDate';
export { getDiscountPercent } from './lib/getDiscountPercent';
export type {
	Product,
	ProductImage,
	ProductProperty,
	ProductsResponse
} from './model/productTypes';

export const ProductDetails = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
