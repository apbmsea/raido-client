import { actions, reducer, name } from './model/orderSlice';
export { default as WatchOrder } from './model/orderSaga';
export { default as OrderItemsWidget } from './ui/OrderItemsWidget';
export { useOrderCreatedNotice } from './model/useOrderCreatedNotice';

export const Order = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
