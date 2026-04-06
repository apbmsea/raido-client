import type { Product } from '@entities/catalog/model/catalog.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CatalogState {
	isLoading: boolean;
	items: Product[];
	categoryId: number | null;
	subcategoryId: number | null;
	title: string
}

const initialState: CatalogState = {
	isLoading: false,
	items: [],
	categoryId: null,
	subcategoryId: null,
	title: "Товары"
};

export const { reducer, actions, name } = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		catalogRequest: state => {
			state.isLoading = true;
		},
		catalogSuccess: (state, action: PayloadAction<[]>) => {
			state.isLoading = false;
			state.items = action.payload;
		},
		catalogFailure: state => {
			state.isLoading = false;
		},
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
			state.subcategoryId = null;
		},
		setSubcategoryId: (state, action: PayloadAction<number>) => {
			state.subcategoryId = action.payload;
			state.categoryId = null;
		},
		setTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		}
	}
});
