import { call, put, select, takeEvery, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Toast, type ShowToastPayload } from '@entities/toast';
import type { RootState } from '@shared/types/store.types';
import { fetchPages } from '@shared/utils/pagination';
import { addFavorite, getFavorite, removeFavorite } from '../api/favoriteApi';
import { actions } from './favoriteSlice';

const selectLoadedPage = (state: RootState) => state.favorite.paging.page;

function* loadFavorite(pageCount = 1) {
	const response = yield* call(() => fetchPages(getFavorite, pageCount));
	yield* put(actions.getFavoriteSuccess(response));
}

function* getFavoriteSaga() {
	try {
		yield* loadFavorite();
	} catch {
		yield* put(actions.getFavoriteFailure());
	}
}

function* getFavoriteMoreSaga() {
	try {
		const page = yield* select(selectLoadedPage);
		const response = yield* call(getFavorite, page + 1);
		yield* put(actions.getFavoriteMoreSuccess(response));
	} catch {
		yield* put(actions.getFavoriteMoreFailure());
	}
}

// После изменения перечитываем все уже подгруженные страницы, чтобы список не обрезался
function* mutateFavorite(
	productId: number,
	request: () => Promise<void>,
	successToast: ShowToastPayload
) {
	try {
		yield* call(request);
		yield* put(Toast.actions.showToast(successToast));
		yield* loadFavorite(yield* select(selectLoadedPage));
	} catch {
		// Список остаётся прежним: кнопка товара вернётся в исходное состояние
		yield* put(
			Toast.actions.showToast({
				message: 'Не удалось обновить избранное. Попробуйте ещё раз.',
				variant: 'error'
			})
		);
	} finally {
		yield* put(actions.mutationSettled({ productId }));
	}
}

function* addFavoriteSaga({
	payload
}: PayloadAction<{ productId: number; isRestore?: boolean }>) {
	yield* mutateFavorite(
		payload.productId,
		() => addFavorite(payload.productId),
		{
			message: payload.isRestore
				? 'Товар возвращён в избранное'
				: 'Товар добавлен в избранное'
		}
	);
}

function* removeFavoriteSaga({
	payload
}: PayloadAction<{ itemId: number; productId: number }>) {
	// Отмена удаления — это обычное добавление товара обратно
	yield* mutateFavorite(
		payload.productId,
		() => removeFavorite(payload.itemId),
		{
			message: 'Товар удалён из избранного',
			variant: 'info',
			undoAction: actions.addFavoriteRequest({
				productId: payload.productId,
				isRestore: true
			})
		}
	);
}

export default function* watchFavorite() {
	yield* takeLatest(actions.getFavoriteRequest.type, getFavoriteSaga);
	yield* takeLatest(actions.getFavoriteMoreRequest.type, getFavoriteMoreSaga);
	yield* takeEvery(actions.addFavoriteRequest.type, addFavoriteSaga);
	yield* takeEvery(actions.removeFavoriteRequest.type, removeFavoriteSaga);
}
