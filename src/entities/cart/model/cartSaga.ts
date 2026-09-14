import { call, put, takeLatest } from 'typed-redux-saga';

import type { PayloadAction } from '@reduxjs/toolkit';

import { Cart } from '..';

import type { AddItemToCartPayload } from './cartType';

import {
	addItemToCart,
	getCart,
	updateCartItemQuantity,
	removeItemFromCart
} from './cartApi';

function* addItemToCartSaga(action: PayloadAction<AddItemToCartPayload>) {
	try {
		yield* call(addItemToCart, action.payload);

		yield* put(Cart.actions.addItemToCartSuccess());

		yield* put(Cart.actions.getCartRequest());
	} catch (error) {
		yield* put(Cart.actions.addItemToCartFailure());
	}
}

function* increaseQuantitySaga(
	action: PayloadAction<{
		product_id: number;
		quantity: number;
	}>
) {
	try {
		yield* call(
			updateCartItemQuantity,
			action.payload.product_id,
			action.payload.quantity
		);

		yield* put(
			Cart.actions.increaseQuantitySuccess({
				product_id: action.payload.product_id,
				quantity: action.payload.quantity
			})
		);
	} catch (error) {
		yield* put(Cart.actions.increaseQuantityFailure());
	}
}

function* decreaseQuantitySaga(
	action: PayloadAction<{
		product_id: number;
		quantity: number;
	}>
) {
	try {
		yield* call(
			updateCartItemQuantity,
			action.payload.product_id,
			action.payload.quantity
		);

		yield* put(
			Cart.actions.decreaseQuantitySuccess({
				product_id: action.payload.product_id,
				quantity: action.payload.quantity
			})
		);
	} catch (error) {
		yield* put(Cart.actions.decreaseQuantityFailure());
	}
}

function* removeItemFromCartSaga(
	action: PayloadAction<{ product_id: number }>
) {
	try {
		yield* call(removeItemFromCart, action.payload.product_id);

		yield* put(
			Cart.actions.removeItemFromCartSuccess({
				product_id: action.payload.product_id
			})
		);
		yield* put(Cart.actions.getCartRequest());
	} catch (error) {
		yield* put(Cart.actions.removeItemFromCartFailure());
	}
}

function* getCartSaga() {
	try {
		const response = yield* call(getCart);
		yield* put(Cart.actions.getCartSuccess(response.items));
		yield* put(Cart.actions.setTotal(response.total));
	} catch (error) {
		yield* put(Cart.actions.getCartFailure());
	}
}

export default function* watchCart() {
	yield* takeLatest(
		Cart.actions.addItemToCartRequest.type,
		addItemToCartSaga
	);

	yield* takeLatest(
		Cart.actions.increaseQuantityRequest.type,
		increaseQuantitySaga
	);

	yield* takeLatest(
		Cart.actions.decreaseQuantityRequest.type,
		decreaseQuantitySaga
	);

	yield* takeLatest(
		Cart.actions.removeItemFromCartRequest.type,
		removeItemFromCartSaga
	);

	yield* takeLatest(Cart.actions.getCartRequest.type, getCartSaga);
	yield* takeLatest(Cart.actions.increaseQuantitySuccess.type, getCartSaga);
	yield* takeLatest(Cart.actions.decreaseQuantitySuccess.type, getCartSaga);
}
