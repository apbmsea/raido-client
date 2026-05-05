import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SearchSuggestion = {
	id: number;
	type: 'category' | 'subcategory';
	svg_icon: string;
	title: string;
	top_category_id: number | null;
	top_category_title: number | null;
};

interface SearchState {
	isLoading: boolean;
	items: SearchSuggestion[];
	search: string;
	errors: {};
}

const initialState: SearchState = {
	isLoading: false,
	items: [],
	search: '',
	errors: {}
};

export const { reducer, actions, name } = createSlice({
	name: 'search',
	initialState,
	reducers: {
		searchRequest: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
			state.isLoading = true;

			if (action.payload.trim() === '') {
				state.items = [];
			}
		},
		searchSuccess: (state, action: PayloadAction<SearchSuggestion[]>) => {
			state.isLoading = false;
			state.items = action.payload;
		},
		searchFailure: (
			state,
			action: PayloadAction<Record<string, { message: string }>>
		) => {
			state.isLoading = false;
			state.errors = action.payload;
		}
	}
});
