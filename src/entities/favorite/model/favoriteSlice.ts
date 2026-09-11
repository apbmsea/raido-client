import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
	total: number;
	items: any[];
	isLoading: boolean;
	isFetch: boolean;
}

const initialState: FavoriteState = {
	total: 0,
	items: [],
	isLoading: false,
	isFetch: false
};

export const { reducer, actions, name } = createSlice({
	name: 'favorite',
	initialState,
	reducers: {
		getFavoriteRequest: state => {
			state.isLoading = true;
		},
		getFavoriteSuccess: (state, action) => {
			state.isLoading = false;
			state.items = action.payload;
		},
		getFavoriteFailure: state => {
			state.isLoading = false;
		},
		addFavoriteRequest: (
			state,
			_action: PayloadAction<{ productId: number }>
		) => {
			state.isFetch = true;
		},
		addFavoriteSuccess: state => {
			state.isFetch = false;
		},
		addFavoriteFailure: state => {
			state.isFetch = false;
		},
		removeFavoriteRequest: (
			state,
			_action: PayloadAction<{ productId: number }>
		) => {
			state.isFetch = true;
		},
		removeFavoriteSuccess: state => {
			state.isFetch = false;
		},
		removeFavoriteFailure: state => {
			state.isFetch = false;
		},
		setTotal: (state, action: PayloadAction<number>) => {
			state.total = action.payload;
		}
	}
});
