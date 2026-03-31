export { default as CatalogPage } from './ui/CatalogPage';
export { default as watchCatalog } from './model/catalogSaga';
import { actions, reducer, name } from './model/catalogSlice';

export const Catalog = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
