import { call, put, takeLatest } from 'typed-redux-saga';
import { getOrders } from '../api/orderApi';
import { actions } from './orderSlice';

function* getOrdersSaga() {
	try {
		const response = yield* call(getOrders);
		yield* put(actions.getOrdersSuccess(response));
	} catch {
		yield* put(actions.getOrdersFailure());
	}
}

// Оформление заказа затрагивает профиль и корзину, поэтому его сценарий
// собран уровнем выше — в features/checkout
export default function* watchOrder() {
	yield* takeLatest(actions.getOrdersRequest.type, getOrdersSaga);
}
