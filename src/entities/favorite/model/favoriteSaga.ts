import { call, put, takeLatest } from 'typed-redux-saga';
import { Favorite } from '..';
import {  getFavorite } from './favoriteApi';

function* getFavoriteSaga() {
	try {
		const response = yield* call(getFavorite);
		yield* put(Favorite.actions.getFavoriteSuccess(response.items));
		console.log(response)
	} catch (error) {
		yield* put(Favorite.actions.getFavoriteFailure());
	}
}
export default function* watchFavorite() {
	yield* takeLatest(Favorite.actions.getFavoriteRequest.type, getFavoriteSaga);
}
