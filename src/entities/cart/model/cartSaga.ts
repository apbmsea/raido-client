import { call, put, select, takeEvery, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Toast, type ShowToastPayload } from '@entities/toast';
import type { RootState } from '@shared/types/store.types';
import { fetchPages } from '@shared/utils/pagination';
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

const selectLoadedPage = (state: RootState) => state.cart.paging.page;

function* loadCart(pageCount = 1) {
	const response = yield* call(() => fetchPages(getCart, pageCount));
	yield* put(actions.getCartSuccess(response));
}

function* getCartSaga() {
	try {
		yield* loadCart();
	} catch {
		yield* put(actions.getCartFailure());
	}
}

function* getCartMoreSaga() {
	try {
		const page = yield* select(selectLoadedPage);
		const response = yield* call(getCart, page + 1);
		yield* put(actions.getCartMoreSuccess(response));
	} catch {
		yield* put(actions.getCartMoreFailure());
	}
}

function* mutateCart(
	productId: number,
	request: () => Promise<void>,
	successToast?: ShowToastPayload
) {
	try {
		yield* call(request);
		if (successToast) yield* put(Toast.actions.showToast(successToast));
		yield* loadCart(yield* select(selectLoadedPage));
	} catch {
		yield* put(
			Toast.actions.showToast({
				message: 'Не удалось обновить корзину. Попробуйте ещё раз.',
				variant: 'error'
			})
		);
	} finally {
		yield* put(actions.mutationSettled({ productId }));
	}
}

function* addItemSaga({ payload }: PayloadAction<AddItemPayload>) {
	yield* mutateCart(
		payload.productId,
		() => addItemToCart(payload.productId),
		{
			message: payload.isRestore
				? 'Товар возвращён в корзину'
				: 'Товар добавлен в корзину'
		}
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
	yield* mutateCart(
		payload.productId,
		() => removeItemFromCart(payload.itemId),
		{
			message: 'Товар удалён из корзины',
			variant: 'info',
			undoAction: actions.addItemRequest({
				productId: payload.productId,
				isRestore: true
			})
		}
	);
}

export default function* watchCart() {
	yield* takeLatest(actions.getCartRequest.type, getCartSaga);
	yield* takeLatest(actions.getCartMoreRequest.type, getCartMoreSaga);
	yield* takeEvery(actions.addItemRequest.type, addItemSaga);
	yield* takeEvery(actions.changeQuantityRequest.type, changeQuantitySaga);
	yield* takeEvery(actions.removeItemRequest.type, removeItemSaga);
}
