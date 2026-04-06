import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
	}
});
