import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SearchSuggestion } from './searchTypes';

interface SearchState {
	isLoading: boolean;
	items: SearchSuggestion[];
	query: string;
}

const initialState: SearchState = {
	isLoading: false,
	items: [],
	query: ''
};

export const { reducer, actions, name } = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setQuery: (state, action: PayloadAction<string>) => {
			state.query = action.payload;

			if (action.payload.trim() === '') {
				state.items = [];
				state.isLoading = false;
			} else {
				state.isLoading = true;
			}
		},
		searchSuccess: (state, action: PayloadAction<SearchSuggestion[]>) => {
			state.isLoading = false;
			state.items = action.payload;
		},
		searchFailure: state => {
			state.isLoading = false;
			state.items = [];
		}
	}
});
