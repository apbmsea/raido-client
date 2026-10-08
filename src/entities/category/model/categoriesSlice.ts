import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from './categoryTypes';

interface CategoriesState {
	categories: Category[];
	isLoading: boolean;
}

const initialState: CategoriesState = {
	categories: [],
	isLoading: true
};

export const { name, actions, reducer } = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		getCategoriesRequest: state => {
			state.isLoading = true;
		},
		getCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
			state.categories = action.payload;
			state.isLoading = false;
		},
		getCategoriesFailure: state => {
			state.isLoading = false;
		}
	}
});
