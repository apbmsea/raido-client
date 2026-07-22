import { call, put, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '..';
import type { AddItemToCartPayload } from './cartType';
import { addItemToCart, getCart } from './cartApi';

function* addItemToCartSaga(action: PayloadAction<AddItemToCartPayload>) {
	try {
		yield* call(addItemToCart, action.payload);
		yield* put(Cart.actions.addItemToCartSuccess());
	} catch (error) {
		yield* put(Cart.actions.addItemToCartFailure());
	}
}
function* getCartSaga() {
	try {
		const response = yield* call(getCart);
		yield* put(Cart.actions.getCartSuccess(response));
	} catch (error) {
		yield* put(Cart.actions.getCartFailure());
	}
}
export default function* watchCart() {
	yield* takeLatest(
		Cart.actions.addItemToCartRequest.type,
		addItemToCartSaga
	);
	yield* takeLatest(Cart.actions.getCartRequest.type, getCartSaga);
}
