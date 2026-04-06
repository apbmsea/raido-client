import type { RootState } from '@shared/types/store.types';

export const selectCatalogQuery = (state: RootState): string => {
	const params = new URLSearchParams();

	const { categoryId, subcategoryId } = state.catalog;
	if (categoryId) params.set('category_id', String(categoryId));
	else if (subcategoryId) params.set('subcategory_id', String(subcategoryId));

	const { currentPage } = state.pagination;
	params.set('page', String(currentPage));

	// filters
	// const { minPrice, maxPrice } = state.catalogFilters;
	// if (minPrice) params.set('min_price', String(minPrice));
	// if (maxPrice) params.set('max_price', String(maxPrice));

	return params.toString();
};
