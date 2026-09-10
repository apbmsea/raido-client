import { createSlice } from '@reduxjs/toolkit';

interface FavoriteState {
	items: any[];
	isLoading: boolean;
	isFetch: boolean;
}

const initialState: FavoriteState = {
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
		// addItemToCartRequest: (
		// 	state,
		// 	_action: PayloadAction<AddItemToCartPayload>
		// ) => {
		// 	state.isFetch = true;
		// },
		// addItemToCartSuccess: state => {
		// 	state.isFetch = false;
		// },
		// addItemToCartFailure: state => {
		// 	state.isFetch = false;
		// }
	}
});
