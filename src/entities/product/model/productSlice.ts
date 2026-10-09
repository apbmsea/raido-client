import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from './productTypes';

interface ProductState {
	isLoading: boolean;
	isError: boolean;
	item: Product | null;
}

const initialState: ProductState = {
	isLoading: false,
	isError: false,
	item: null
};

export const { reducer, actions, name } = createSlice({
	name: 'product',
	initialState,
	reducers: {
		productRequest: (state, _action: PayloadAction<{ id: string }>) => {
			state.isLoading = true;
			state.isError = false;
			state.item = null;
		},
		productSuccess: (state, action: PayloadAction<Product>) => {
			state.isLoading = false;
			state.item = action.payload;
		},
		productFailure: state => {
			state.isLoading = false;
			state.isError = true;
		}
	}
});
