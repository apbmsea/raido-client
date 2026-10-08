import { call, put, takeEvery, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { addFavorite, getFavorite, removeFavorite } from '../api/favoriteApi';
import { actions } from './favoriteSlice';

function* loadFavorite() {
	const response = yield* call(getFavorite);
	yield* put(actions.getFavoriteSuccess(response));
}

function* getFavoriteSaga() {
	try {
		yield* loadFavorite();
	} catch {
		yield* put(actions.getFavoriteFailure());
	}
}

function* mutateFavorite(productId: number, request: () => Promise<void>) {
	try {
		yield* call(request);
		yield* loadFavorite();
	} catch {
		// Список остаётся прежним: кнопка товара вернётся в исходное состояние
	} finally {
		yield* put(actions.mutationSettled({ productId }));
	}
}

function* addFavoriteSaga({ payload }: PayloadAction<{ productId: number }>) {
	yield* mutateFavorite(payload.productId, () =>
		addFavorite(payload.productId)
	);
}

function* removeFavoriteSaga({
	payload
}: PayloadAction<{ itemId: number; productId: number }>) {
	yield* mutateFavorite(payload.productId, () =>
		removeFavorite(payload.itemId)
	);
}

export default function* watchFavorite() {
	yield* takeLatest(actions.getFavoriteRequest.type, getFavoriteSaga);
	yield* takeEvery(actions.addFavoriteRequest.type, addFavoriteSaga);
	yield* takeEvery(actions.removeFavoriteRequest.type, removeFavoriteSaga);
}
