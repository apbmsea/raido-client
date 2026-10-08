import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FavoriteItem, FavoriteResponse } from './favoriteTypes';

interface FavoriteState {
	total: number;
	items: FavoriteItem[];
	isLoading: boolean;
	/** Товары, по которым сейчас идёт запрос на изменение избранного */
	pendingProductIds: number[];
}

const initialState: FavoriteState = {
	total: 0,
	items: [],
	isLoading: false,
	pendingProductIds: []
};

const startMutation = (
	state: FavoriteState,
	action: PayloadAction<{ productId: number }>
) => {
	if (!state.pendingProductIds.includes(action.payload.productId)) {
		state.pendingProductIds.push(action.payload.productId);
	}
};

export const { reducer, actions, name } = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		getFavoriteRequest: state => {
			state.isLoading = true;
		},
		getFavoriteSuccess: (state, action: PayloadAction<FavoriteResponse>) => {
			state.isLoading = false;
			state.items = action.payload.items;
			state.total = action.payload.total;
		},
		getFavoriteFailure: state => {
			state.isLoading = false;
		},
		addFavoriteRequest: (
			state,
			action: PayloadAction<{ productId: number }>
		) => startMutation(state, action),
		removeFavoriteRequest: (
			state,
			action: PayloadAction<{ itemId: number; productId: number }>
		) => startMutation(state, action),
		mutationSettled: (
			state,
			action: PayloadAction<{ productId: number }>
		) => {
			state.pendingProductIds = state.pendingProductIds.filter(
				id => id !== action.payload.productId
			);
		},
		reset: () => initialState
	}
});
