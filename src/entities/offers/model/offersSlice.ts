import type { Product } from '@entities/product';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface OffersState {
	items: Product[];
	isLoading: boolean;
}

const initialState: OffersState = {
	items: [],
	isLoading: false
};

export const { reducer, actions, name } = createSlice({
	name: 'offers',
	initialState,
	reducers: {
		getOffersRequest: state => {
			state.isLoading = true;
		},
		getOffersSuccess: (state, action: PayloadAction<Product[]>) => {
			state.isLoading = false;
			state.items = action.payload;
		},
		getOffersFailure: state => {
			state.isLoading = false;
		}
	}
});
