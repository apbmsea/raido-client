import { call, put, select, takeLatest } from 'typed-redux-saga';
import { Catalog } from '..';
import { getProducts } from '@entities/catalog/model/catalog.api';
import { Pagination } from '../features/pagination';
import type { RootState } from '@shared/types/store.types';
import { Filters } from '../features/filters';

const isCatalogPage = () => /^\/catalog\/?$/.test(window.location.pathname);

function* catalogSaga() {
	try {
		const { categoryId, subcategoryId, sort } = yield* select(
			(state: RootState) => state.catalog
		);

		const { currentPage } = yield* select(
			(state: RootState) => state.pagination
		);

		const { minPrice, maxPrice } = yield* select(
			(state: RootState) => state.filters.price
		);

		const { selectedProducers } = yield* select(
			(state: RootState) => state.filters
		);

		const params = new URLSearchParams();

		if (categoryId) {
			params.set('category_id', String(categoryId));
		}

		if (subcategoryId) {
			params.set('subcategory_id', String(subcategoryId));
		}

		if (sort) {
			params.set('sort_by', sort);
		}

		if (minPrice) {
			params.set('min_price', String(minPrice));
		}

		if (maxPrice) {
			params.set('max_price', String(maxPrice));
		}

		if (selectedProducers) {
			selectedProducers.forEach((name: string) => {
				params.append('producer_names', name.trim());
			});
		}

		params.set('page', String(currentPage));

		const queryString = params.toString();

		if (isCatalogPage()) {
			window.history.replaceState(
				window.history.state,
				'',
				`?${queryString}`
			);
		}

		const response = yield* call(getProducts, queryString);

		yield* put(Pagination.actions.setTotalPages(response.total_pages));

		yield* put(
			Catalog.actions.setTitle(
				response.subcategory_name || response.category_name || 'Товары'
			)
		);
		yield* put(Filters.actions.setProducers(response.producer_names));
		yield* put(Catalog.actions.catalogSuccess(response.items));
	} catch (error) {
		yield* put(Catalog.actions.catalogFailure());
	}
}

function* initCatalogFromQuery() {
	if (!isCatalogPage()) return;

	const params = new URLSearchParams(window.location.search);

	const categoryId = params.get('category_id');
	const subcategoryId = params.get('subcategory_id');
	const page = params.get('page');
	const sort = params.get('sort_by');
	const minPrice = params.get('min_price');
	const maxPrice = params.get('max_price');
	const producers = params.getAll('producer_names');

	if (sort) {
		yield* put(Catalog.actions.setSort(sort as any));
	}

	if (categoryId) {
		yield* put(Catalog.actions.setCategoryId(Number(categoryId)));
	}

	if (subcategoryId) {
		yield* put(Catalog.actions.setSubcategoryId(Number(subcategoryId)));
	}

	if (minPrice || maxPrice) {
		yield* put(
			Filters.actions.setPrice({
				minPrice: Number(minPrice),
				maxPrice: Number(maxPrice)
			})
		);
	}

	if (producers) {
		yield* put(Filters.actions.setSelectedProducers(producers));
	}

	// страница последней: смена сортировки и фильтров сбрасывает её на первую
	if (page) {
		yield* put(Pagination.actions.setCurrentPage(Number(page)));
	}

	yield* put(Catalog.actions.catalogRequest());
}

export default function* watchCatalog() {
	yield* call(initCatalogFromQuery);

	yield* takeLatest(
		[
			Catalog.actions.catalogRequest.type,
			Catalog.actions.setSubcategoryId.type,
			Catalog.actions.navigateToСategory.type,
			Catalog.actions.navigateToSubcategory.type,
			Pagination.actions.setCurrentPage.type,
			Catalog.actions.setSort.type,
			Filters.actions.setPrice.type,
			Filters.actions.toggleProducer.type,
			Filters.actions.resetFilters.type
		],
		catalogSaga
	);
}
