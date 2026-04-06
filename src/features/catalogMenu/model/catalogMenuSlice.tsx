import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CatalogState {
	isOpen: boolean;
	categoryId: number;
}

const initialState: CatalogState = {
	isOpen: false,
	categoryId: 1
};

export const { name, actions, reducer } = createSlice({
	name: 'catalogMenu',
	initialState,
	reducers: {
		setIsOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		}
	}
});
