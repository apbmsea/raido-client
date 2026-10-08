import { actions, reducer, name } from './model/orderSlice';

export { default as watchOrder } from './model/orderSaga';
export { createOrder, getOrderById } from './api/orderApi';
export { OrderList } from './ui/OrderList';
export type {
	CreateOrderPayload,
	OrderDetails,
	OrderProduct,
	OrderType
} from './model/orderTypes';

export const Order = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
