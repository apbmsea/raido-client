import { call, put, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getProduct } from '../api/productApi';
import { actions } from './productSlice';

function* productSaga(action: PayloadAction<{ id: string }>) {
	try {
		const response = yield* call(getProduct, action.payload.id);
		yield* put(actions.productSuccess(response));
	} catch {
		yield* put(actions.productFailure());
	}
}

export default function* watchProduct() {
	yield* takeLatest(actions.productRequest.type, productSaga);
}
