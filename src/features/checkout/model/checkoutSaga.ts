import { call, put, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '@entities/cart';
import { Modal } from '@entities/modal';
import { createOrder, Order, type CreateOrderPayload } from '@entities/order';
import { editUser, User } from '@entities/user';
import { getApiErrors } from '@shared/utils/errorHandler';
import { navigateTo } from '@shared/utils/navigate';

function* checkoutSaga(action: PayloadAction<CreateOrderPayload>) {
	try {
		try {
			yield* call(editUser, action.payload.user);
		} catch {}

		const order = yield* call(createOrder, action.payload);

		yield* put(Order.actions.createOrderSuccess(order?.id ?? null));
		yield* put(Order.actions.getOrdersRequest());
		yield* put(Cart.actions.getCartRequest());
		yield* put(User.actions.refreshUserRequest());

		yield* call(navigateTo, '/profile/orders', { replace: true });
		yield* put(Modal.actions.openModal('orderCreated'));
	} catch (error) {
		yield* put(
			Order.actions.createOrderFailure(
				getApiErrors(
					error,
					'Не удалось оформить заказ. Попробуйте ещё раз.'
				)
			)
		);
	}
}

export default function* watchCheckout() {
	yield* takeLatest(Order.actions.createOrderRequest.type, checkoutSaga);
}
