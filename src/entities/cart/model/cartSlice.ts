import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AddItemToCartPayload } from './cartType';

interface CartState {
	items: any[];
	isLoading: boolean;
	isFetch: boolean;
}

const initialState: CartState = {
	items: [],
	isLoading: false,
	isFetch: false
};

export const { reducer, actions, name } = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		getCartRequest: state => {
			state.isLoading = true;
		},
		getCartSuccess: (state, action) => {
			state.isLoading = false;
			state.items = action.payload;
		},
		getCartFailure: state => {
			state.isLoading = false;
		},
		addItemToCartRequest: (
			state,
			_action: PayloadAction<AddItemToCartPayload>
		) => {
			state.isFetch = true;
		},
		addItemToCartSuccess: state => {
			state.isFetch = false;
		},
		addItemToCartFailure: state => {
			state.isFetch = false;
		}
	}
});
