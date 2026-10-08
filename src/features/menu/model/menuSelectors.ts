import type { RootState } from '@shared/types/store.types';

export const selectIsCatalogOpen = (state: RootState) =>
	state.menu.isOpen && state.menu.screen !== 'menu';

/** Категория, подкатегории которой сейчас показаны в каталоге */
export const selectActiveCategory = (state: RootState) => {
	const { categories } = state.categories;

	return (
		categories.find(category => category.id === state.menu.categoryId) ??
		categories[0]
	);
};
