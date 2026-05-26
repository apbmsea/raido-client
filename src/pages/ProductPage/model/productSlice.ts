import type { Product } from '@entities/catalog/model/catalog.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
	isLoading: boolean;
	item: Product | null;
}

const initialState: ProductState = {
	isLoading: false,
	item: null
};

export const { reducer, actions, name } = createSlice({
	name: 'product',
	initialState,
	reducers: {
		productRequest: (state, _action: PayloadAction<{ id: string }>) => {
			state.isLoading = true;
		},
		productSuccess: (state, action: PayloadAction<Product>) => {
			state.isLoading = false;
			state.item = action.payload;
		},
		productFailure: state => {
			state.isLoading = false;
		}
	}
});
