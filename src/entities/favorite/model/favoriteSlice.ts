import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
	applyNextPage,
	failNextPage,
	initialPaging,
	startNextPage,
	toPaging,
	type PagingState
} from '@shared/utils/pagination';
import type { FavoriteItem, FavoriteResponse } from './favoriteTypes';

interface FavoriteState {
	total: number;
	items: FavoriteItem[];
	isLoading: boolean;
	paging: PagingState;
	pendingProductIds: number[];
}

const initialState: FavoriteState = {
	total: 0,
	items: [],
	isLoading: false,
	paging: initialPaging,
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
			state.paging = toPaging(action.payload);
		},
		getFavoriteFailure: state => {
			state.isLoading = false;
		},
		getFavoriteMoreRequest: state => startNextPage(state.paging),
		getFavoriteMoreSuccess: (
			state,
			action: PayloadAction<FavoriteResponse>
		) => {
			applyNextPage(state.paging, state.items, action.payload);
			state.total = action.payload.total;
		},
		getFavoriteMoreFailure: state => failNextPage(state.paging),
		addFavoriteRequest: (
			state,
			action: PayloadAction<{ productId: number; isRestore?: boolean }>
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
