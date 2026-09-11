import { call, put, takeLatest } from 'typed-redux-saga';
import { Favorite } from '..';
import { addFavorite, getFavorite, removeFavorite } from './favoriteApi';
import type { PayloadAction } from '@reduxjs/toolkit';

function* getFavoriteSaga() {
	try {
		const response = yield* call(getFavorite);
		yield* put(Favorite.actions.getFavoriteSuccess(response.items));
		yield* put(Favorite.actions.setTotal(response.total));
	} catch (error) {
		yield* put(Favorite.actions.getFavoriteFailure());
	}
}

function* addFavoriteSaga(action: PayloadAction<{ productId: number }>) {
	try {
		yield* call(addFavorite, action.payload.productId);
		yield* put(Favorite.actions.addFavoriteSuccess());
	} catch (error) {
		yield* put(Favorite.actions.addFavoriteFailure());
	}
}

function* removeFavoriteSaga(action: PayloadAction<{ productId: number }>) {
	try {
		yield* call(removeFavorite, action.payload.productId);
		yield* put(Favorite.actions.removeFavoriteSuccess());
	} catch (error) {
		yield* put(Favorite.actions.removeFavoriteFailure());
	}
}

export default function* watchFavorite() {
	yield* takeLatest(
		Favorite.actions.getFavoriteRequest.type,
		getFavoriteSaga
	);
	yield* takeLatest(
		Favorite.actions.addFavoriteSuccess.type,
		getFavoriteSaga
	);
	yield* takeLatest(
		Favorite.actions.removeFavoriteSuccess.type,
		getFavoriteSaga
	);
	yield* takeLatest(
		Favorite.actions.addFavoriteRequest.type,
		addFavoriteSaga
	);
	yield* takeLatest(
		Favorite.actions.removeFavoriteRequest.type,
		removeFavoriteSaga
	);
}
