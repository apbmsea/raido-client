import { call, put, takeLatest } from 'typed-redux-saga';
import { Product } from '..';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getProduct } from '@entities/product';

function* catalogSaga(action: PayloadAction<{ id: string }>) {
	try {
		const response = yield* call(getProduct, action.payload.id);

		yield* put(Product.actions.productSuccess(response));
	} catch (error) {
		yield* put(Product.actions.productFailure());
	}
}

export default function* watchProduct() {
	yield* takeLatest(Product.actions.productRequest.type, catalogSaga);
}
