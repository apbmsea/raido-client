import { call, put, takeLatest } from 'typed-redux-saga';
import { Order } from '..';
import { createOrder, getOrders } from './orderApi';
import { editUser } from '@entities/user/model/userApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CreateOrderPayload } from './orderTypes';
import { Cart } from '@entities/cart';
import { navigateTo } from '@shared/utils/navigate';
import { isApiError } from '@shared/utils/errorHandler';

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

		yield* put(Order.actions.createOrderSuccess());
		yield* put(Order.actions.getOrdersRequest());
		yield* put(Cart.actions.getCartRequest());

		navigateTo(
			orderResponse?.id
				? `/profile/orders/${orderResponse.id}`
				: '/profile/orders',
			{ replace: true }
		);
	} catch (error) {
		if (isApiError(error) && Object.keys(error.errors).length > 0) {
			yield* put(Order.actions.createOrderFailure(error.errors));
		} else {
			yield* put(
				Order.actions.createOrderFailure({
					_form: {
						message: 'Не удалось оформить заказ. Попробуйте ещё раз.'
					}
				})
			);
		}
	}
}

export default function* watchOrder() {
	yield* takeLatest(Order.actions.getOrdersRequest.type, getOrdersSaga);
	yield* takeLatest(Order.actions.createOrderRequest.type, createOrderSaga);
}
