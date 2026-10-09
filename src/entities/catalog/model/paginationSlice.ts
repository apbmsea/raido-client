import { createSlice, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import { actions as catalogActions } from './catalogSlice';
import { actions as filtersActions } from './filtersSlice';

interface PaginationState {
	totalPages: number;
	currentPage: number;
}

const initialState: PaginationState = {
	totalPages: 1,
	currentPage: 1
};

export const { reducer, actions, name } = createSlice({
	name: 'pagination',
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setTotalPages: (state, action: PayloadAction<number>) => {
			state.totalPages = action.payload;
		}
	},
	extraReducers: builder => {
		builder.addMatcher(
			isAnyOf(
				catalogActions.navigateToCategory,
				catalogActions.navigateToSubcategory,
				catalogActions.navigateToSearch,
				catalogActions.setSort,
				filtersActions.setPrice,
				filtersActions.toggleProducer,
				filtersActions.resetFilters
			),
			state => {
				state.currentPage = 1;
			}
		);
	}
});
