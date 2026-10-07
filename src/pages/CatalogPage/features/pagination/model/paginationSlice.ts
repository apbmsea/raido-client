import { createSlice, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import { actions as catalogActions } from '../../../model/catalogSlice';
import { actions as filtersActions } from '../../filters/model/filtersSlice';

interface PaginationState {
	isLoading: boolean;
	totalPages: number;
	currentPage: number;
}

const initialState: PaginationState = {
	isLoading: false,
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
			state.isLoading = false;
			state.totalPages = action.payload
		}
	},
	extraReducers: builder => {
		builder.addMatcher(
			isAnyOf(
				catalogActions.navigateToСategory,
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
