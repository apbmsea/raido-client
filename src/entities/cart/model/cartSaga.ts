import { call, put, takeEvery, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	addItemToCart,
	getCart,
	removeItemFromCart,
	updateCartItemQuantity
} from '../api/cartApi';
import { actions } from './cartSlice';
import type {
	AddItemPayload,
	ChangeQuantityPayload,
	RemoveItemPayload
} from './cartTypes';

function* loadCart() {
	const response = yield* call(getCart);
	yield* put(actions.getCartSuccess(response));
}

function* getCartSaga() {
	try {
		yield* loadCart();
	} catch {
		yield* put(actions.getCartFailure());
	}
}

/**
 * Общий сценарий изменения корзины: запрос, затем свежий состав с сервера —
 * суммы и скидки считает он. Товар остаётся «в ожидании» до конца обновления
 */
function* mutateCart(productId: number, request: () => Promise<void>) {
	try {
		yield* call(request);
		yield* loadCart();
	} catch {
		// Корзина остаётся прежней: кнопка товара вернётся в исходное состояние
	} finally {
		yield* put(actions.mutationSettled({ productId }));
	}
}

function* addItemSaga({ payload }: PayloadAction<AddItemPayload>) {
	yield* mutateCart(payload.productId, () =>
		addItemToCart(payload.productId)
	);
}

function* changeQuantitySaga({
	payload
}: PayloadAction<ChangeQuantityPayload>) {
	yield* mutateCart(payload.productId, () =>
		updateCartItemQuantity(payload.itemId, payload.quantity)
	);
}

function* removeItemSaga({ payload }: PayloadAction<RemoveItemPayload>) {
	yield* mutateCart(payload.productId, () =>
		removeItemFromCart(payload.itemId)
	);
}

export default function* watchCart() {
	yield* takeLatest(actions.getCartRequest.type, getCartSaga);
	// takeEvery: изменения разных товаров не должны отменять друг друга
	yield* takeEvery(actions.addItemRequest.type, addItemSaga);
	yield* takeEvery(actions.changeQuantityRequest.type, changeQuantitySaga);
	yield* takeEvery(actions.removeItemRequest.type, removeItemSaga);
}
