import { actions, reducer, name } from './model/cartSlice';

export { default as watchCart } from './model/cartSaga';
export {
	selectCartItemByProductId,
	selectIsCartProductPending,
	selectSelectedCartItems,
	selectSelectedCartTotal
} from './model/cartSelectors';
export type { CartItem } from './model/cartTypes';

export const Cart = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
