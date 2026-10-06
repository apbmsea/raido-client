import type { Product } from '@entities/catalog/model/catalog.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SortType = 'retail_price_asc' | 'retail_price_desc' | 'name_asc';

interface CatalogState {
	isLoading: boolean;
	items: Product[];
	categoryId: number | null;
	subcategoryId: number | null;
	title: string;
	sort: SortType;
	view: 'grid' | 'list';
}

const initialState: CatalogState = {
	isLoading: false,
	items: [],
	categoryId: null,
	subcategoryId: null,
	title: 'Товары',
	sort: 'name_asc',
	view: 'grid'
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
		},
		setSort: (state, action: PayloadAction<SortType>) => {
			state.sort = action.payload;
		},
		setView: (state, action: PayloadAction<'grid' | 'list'>) => {
			state.view = action.payload;
		},
		navigateToСategory: (state, action: PayloadAction<{ id: number }>) => {
			state.subcategoryId = null;
			state.categoryId = action.payload.id;
			state.sort = initialState.sort;
		},
		navigateToSubcategory: (
			state,
			action: PayloadAction<{ id: number }>
		) => {
			state.subcategoryId = action.payload.id;
			state.categoryId = null;
			state.sort = initialState.sort;
		}
	}
});
