import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type MenuType = 'menu' | 'category' | 'subcategory';

interface MenuState {
	isOpen: boolean;
	type: MenuType;
}

const initialState: MenuState = {
	isOpen: false,
	type: 'menu'
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
		}
	}
});
