import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type MenuType = 'menu' | 'category' | 'subcategory';

interface MenuState {
	isOpen: boolean;
	type: MenuType;
	categoryId: number;
}

const initialState: MenuState = {
	isOpen: false,
	type: 'menu',
	categoryId: 1
};

export const { name, actions, reducer } = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		setIsOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
		setType: (state, action: PayloadAction<MenuType>) => {
			state.type = action.payload;
		},
		setCategoryId: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
		}
	}
});
