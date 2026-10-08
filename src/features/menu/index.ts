import { actions, reducer, name } from './model/menuSlice';

export { default as CatalogCategories } from './ui/CatalogCategories';
export { default as CatalogSubcategories } from './ui/CatalogSubcategories';
export { selectIsCatalogOpen } from './model/menuSelectors';
export type { MenuScreen } from './model/menuSlice';

export const Menu = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
