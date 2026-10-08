import * as catalog from './model/catalogSlice';
import * as filters from './model/filtersSlice';
import * as pagination from './model/paginationSlice';

export { default as watchCatalog } from './model/catalogSaga';
export { useOpenCatalogPage } from './lib/useOpenCatalogPage';
export {
	DEFAULT_SORT,
	PRICE_LIMITS,
	SORT_OPTIONS,
	type CatalogView,
	type SortType
} from './model/catalogTypes';

/** Текущая выборка товаров каталога: раздел, поиск, сортировка, вид */
export const Catalog = {
	reducer: {
		[catalog.name]: catalog.reducer
	},
	actions: catalog.actions,
	name: catalog.name
};

export const Filters = {
	reducer: {
		[filters.name]: filters.reducer
	},
	actions: filters.actions,
	name: filters.name
};

export const Pagination = {
	reducer: {
		[pagination.name]: pagination.reducer
	},
	actions: pagination.actions,
	name: pagination.name
};
