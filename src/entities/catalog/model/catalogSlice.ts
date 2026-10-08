import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@entities/product';
import {
	DEFAULT_SORT,
	type CatalogView,
	type SortType
} from './catalogTypes';
import { readCatalogView } from './catalogViewStorage';

interface CatalogState {
	isLoading: boolean;
	isError: boolean;
	items: Product[];
	total: number;
	categoryId: number | null;
	subcategoryId: number | null;
	search: string;
	title: string;
	sort: SortType;
	view: CatalogView;
}

const initialState: CatalogState = {
	// До первого ответа сервера список считается загружающимся, а не пустым
	isLoading: true,
	isError: false,
	items: [],
	total: 0,
	categoryId: null,
	subcategoryId: null,
	search: '',
	title: 'Товары',
	sort: DEFAULT_SORT,
	view: readCatalogView()
};

export const { reducer, actions, name } = createSlice({
	name: 'catalog',
	initialState,
	reducers: {
		/** Перезапросить список с текущими параметрами */
		catalogRequest: () => {},
		catalogPending: state => {
			state.isLoading = true;
			state.isError = false;
		},
		catalogSuccess: (
			state,
			action: PayloadAction<{
				items: Product[];
				total: number;
				title: string;
			}>
		) => {
			state.isLoading = false;
			state.items = action.payload.items;
			state.total = action.payload.total;
			state.title = action.payload.title;
		},
		catalogFailure: state => {
			state.isLoading = false;
			state.isError = true;
			state.items = [];
			state.total = 0;
		},
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
			state.subcategoryId = null;
		},
		setSubcategoryId: (state, action: PayloadAction<number>) => {
			state.subcategoryId = action.payload;
			state.categoryId = null;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setSort: (state, action: PayloadAction<SortType>) => {
			state.sort = action.payload;
		},
		setView: (state, action: PayloadAction<CatalogView>) => {
			state.view = action.payload;
		},
		navigateToCategory: (state, action: PayloadAction<{ id: number }>) => {
			state.subcategoryId = null;
			state.categoryId = action.payload.id;
			state.search = '';
			state.sort = initialState.sort;
		},
		navigateToSubcategory: (
			state,
			action: PayloadAction<{ id: number }>
		) => {
			state.subcategoryId = action.payload.id;
			state.categoryId = null;
			state.search = '';
			state.sort = initialState.sort;
		},
		navigateToSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
			state.categoryId = null;
			state.subcategoryId = null;
			state.sort = initialState.sort;
		}
	}
});
