import { call, put, takeLatest } from 'typed-redux-saga';
import { Order } from '..';
import { createOrder, getOrders } from './orderApi';
import { editUser } from '@entities/user/model/userApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CreateOrderPayload } from './orderTypes';

function* getOrdersSaga() {
	try {
		const response = yield* call(getOrders);
		yield* put(Order.actions.getOrdersSuccess(response.items));
		yield* put(Order.actions.setTotal(response.total));
	} catch (error) {
		yield* put(Order.actions.getOrdersFailure());
	}
}

function* createOrderSaga(action: PayloadAction<CreateOrderPayload>) {
	try {
		try {
			yield* call(editUser, {
				payload: action.payload.user
			});
		} catch (error) {
			console.error('Failed to update user before order creation', error);
		}

		const orderResponse = yield* call(createOrder, action.payload);

		console.log(orderResponse);
		yield* put(Order.actions.createOrderSuccess());
	} catch (error) {
		yield* put(Order.actions.createOrderFailure());
	}
}

export default function* watchOrder() {
	yield* takeLatest(Order.actions.getOrdersRequest.type, getOrdersSaga);
	yield* takeLatest(Order.actions.createOrderRequest.type, createOrderSaga);
}
