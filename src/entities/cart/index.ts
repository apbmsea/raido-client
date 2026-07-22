import { actions, reducer, name } from './model/cartSlice';
export type { AddItemToCartPayload } from './model/cartType';
export { default as WatchCart } from './model/cartSaga';
export { CartList } from './ui/CartList';

export const Cart = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
