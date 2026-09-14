import { call, put, takeLatest } from 'typed-redux-saga';
import { Order } from '..';
import { getOrders } from './orderApi';

function* getOrdersSaga() {
	try {
		const response = yield* call(getOrders);
		yield* put(Order.actions.getOrdersSuccess(response.items));
        yield* put(Order.actions.setTotal(response.total));
	} catch (error) {
		yield* put(Order.actions.getOrdersFailure());
	}
}
export default function* watchOrder() {
	yield* takeLatest(Order.actions.getOrdersRequest.type, getOrdersSaga);
}
