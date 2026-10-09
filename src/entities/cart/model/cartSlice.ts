import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
	applyNextPage,
	failNextPage,
	initialPaging,
	startNextPage,
	toPaging,
	type PagingState
} from '@shared/utils/pagination';
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
	paging: PagingState;
	pendingProductIds: number[];
	excludedProductIds: number[];
}

const initialState: CartState = {
	total: 0,
	items: [],
	isLoading: false,
	paging: initialPaging,
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
			state.paging = toPaging(action.payload);
			state.excludedProductIds = state.excludedProductIds.filter(id =>
				items.some(item => item.product_id === id)
			);
		},
		getCartFailure: state => {
			state.isLoading = false;
		},
		getCartMoreRequest: state => startNextPage(state.paging),
		getCartMoreSuccess: (state, action: PayloadAction<CartResponse>) => {
			applyNextPage(state.paging, state.items, action.payload);
			state.total = action.payload.total;
		},
		getCartMoreFailure: state => failNextPage(state.paging),
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
