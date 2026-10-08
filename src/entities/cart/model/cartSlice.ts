import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
	AddItemPayload,
	CartItem,
	CartResponse,
	ChangeQuantityPayload,
	RemoveItemPayload
} from './cartTypes';

interface CartState {
	total: number;
	items: CartItem[];
	isLoading: boolean;
	/** Товары, по которым сейчас идёт запрос на изменение корзины */
	pendingProductIds: number[];
	/**
	 * Товары, с которых покупатель снял отметку. Храним исключения, а не выбранные:
	 * так новые товары в корзине отмечены сразу, а выбор переживает перезагрузку списка
	 */
	excludedProductIds: number[];
}

const initialState: CartState = {
	total: 0,
	items: [],
	isLoading: false,
	pendingProductIds: [],
	excludedProductIds: []
};

const startMutation = (
	state: CartState,
	action: PayloadAction<{ productId: number }>
) => {
	if (!state.pendingProductIds.includes(action.payload.productId)) {
		state.pendingProductIds.push(action.payload.productId);
	}
};

export const { reducer, actions, name } = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		getCartRequest: state => {
			state.isLoading = true;
		},
		getCartSuccess: (state, action: PayloadAction<CartResponse>) => {
			const { items, total } = action.payload;

			state.isLoading = false;
			state.items = items;
			state.total = total;
			state.excludedProductIds = state.excludedProductIds.filter(id =>
				items.some(item => item.product_id === id)
			);
		},
		getCartFailure: state => {
			state.isLoading = false;
		},
		addItemRequest: (state, action: PayloadAction<AddItemPayload>) =>
			startMutation(state, action),
		changeQuantityRequest: (
			state,
			action: PayloadAction<ChangeQuantityPayload>
		) => startMutation(state, action),
		removeItemRequest: (state, action: PayloadAction<RemoveItemPayload>) =>
			startMutation(state, action),
		mutationSettled: (
			state,
			action: PayloadAction<{ productId: number }>
		) => {
			state.pendingProductIds = state.pendingProductIds.filter(
				id => id !== action.payload.productId
			);
		},
		toggleItemSelection: (state, action: PayloadAction<number>) => {
			const index = state.excludedProductIds.indexOf(action.payload);
			if (index === -1) {
				state.excludedProductIds.push(action.payload);
			} else {
				state.excludedProductIds.splice(index, 1);
			}
		},
		setAllSelected: (state, action: PayloadAction<boolean>) => {
			state.excludedProductIds = action.payload
				? []
				: state.items.map(item => item.product_id);
		},
		reset: () => initialState
	}
});
