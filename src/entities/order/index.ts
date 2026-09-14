import { actions, reducer, name } from './model/orderSlice';
export { default as WatchOrder } from './model/orderSaga';

export const Order = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
