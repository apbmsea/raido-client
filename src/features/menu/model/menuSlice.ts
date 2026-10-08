import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/** menu — разделы сайта, category — категории каталога, subcategory — их подкатегории */
export type MenuScreen = 'menu' | 'category' | 'subcategory';

interface MenuState {
	/**
	 * Одно состояние на оба меню: на мобильных его показывает бургер-меню,
	 * на десктопе — выпадающий каталог (только экраны категорий)
	 */
	isOpen: boolean;
	screen: MenuScreen;
	/** null — категория ещё не выбрана, показываем первую */
	categoryId: number | null;
}

const initialState: MenuState = {
	isOpen: false,
	screen: 'menu',
	categoryId: null
};

export const { name, actions, reducer } = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		openMenu: state => {
			state.isOpen = true;
			state.screen = 'menu';
		},
		openCatalog: state => {
			state.isOpen = true;
			state.screen = 'category';
		},
		toggleCatalog: state => {
			const isCatalogOpen = state.isOpen && state.screen !== 'menu';

			state.isOpen = !isCatalogOpen;
			state.screen = isCatalogOpen ? 'menu' : 'category';
		},
		close: state => {
			state.isOpen = false;
			state.screen = 'menu';
		},
		setScreen: (state, action: PayloadAction<MenuScreen>) => {
			state.screen = action.payload;
		},
		selectCategory: (state, action: PayloadAction<number>) => {
			state.categoryId = action.payload;
			state.screen = 'subcategory';
		}
	}
});
