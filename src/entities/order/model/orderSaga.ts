import { call, put, select, takeLatest } from 'typed-redux-saga';
import type { RootState } from '@shared/types/store.types';
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

function* getOrdersMoreSaga() {
	try {
		const page = yield* select(
			(state: RootState) => state.order.paging.page
		);
		const response = yield* call(getOrders, page + 1);
		yield* put(actions.getOrdersMoreSuccess(response));
	} catch {
		yield* put(actions.getOrdersMoreFailure());
	}
}

// Оформление заказа затрагивает профиль и корзину, поэтому его сценарий
// собран уровнем выше — в features/checkout
export default function* watchOrder() {
	yield* takeLatest(actions.getOrdersRequest.type, getOrdersSaga);
	yield* takeLatest(actions.getOrdersMoreRequest.type, getOrdersMoreSaga);
}
