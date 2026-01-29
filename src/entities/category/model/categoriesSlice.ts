import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Category } from './categories.types';

interface СategoriesState {
	categories: Category[];
	isLoading: boolean;
}

const initialState: СategoriesState = {
	categories: [],
	isLoading: true
};

export const { name, actions, reducer } = createSlice({
	name: 'сategories',
	initialState,
	reducers: {
		getCategoriesRequest: () => {},
		getCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
			state.categories = action.payload;
			state.isLoading = false;
		},
		getCategoriesFailure: state => {
			state.isLoading = false;
		}
	}
});
