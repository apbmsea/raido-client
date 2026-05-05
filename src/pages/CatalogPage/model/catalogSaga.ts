import { call, put, select, takeLatest } from 'typed-redux-saga';
import { Catalog } from '..';
import { getProducts } from '@entities/catalog/model/catalog.api';
import { Pagination } from '../features/pagination';
import type { RootState } from '@shared/types/store.types';
import { Filters } from '../features/filters';

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

		const { producers, selectedProducers } = yield* select(
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

		window.history.replaceState(null, '', `?${queryString}`);

		const response = yield* call(getProducts, queryString);

		yield* put(Pagination.actions.setTotalPages(response.total_pages));

		yield* put(
			Catalog.actions.setTitle(
				response.subcategory_name || response.category_name || 'Товары'
			)
		);
		if (producers.length === 0) {
			yield* put(Filters.actions.setProducers(response.producer_names));
		}
		yield* put(Catalog.actions.catalogSuccess(response.items));
	} catch (error) {
		yield* put(Catalog.actions.catalogFailure());
	}
}

function* initCatalogFromQuery() {
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

	if (page) {
		yield* put(Pagination.actions.setCurrentPage(Number(page)));
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

	yield* put(Catalog.actions.catalogRequest());
}

function* resetSaga() {
	try {
		yield* put(Pagination.actions.setCurrentPage(1));
		yield* put(Pagination.actions.setTotalPages(1));
		yield* put(Filters.actions.resetFilters());
	} catch (error) {
		yield* put(Catalog.actions.catalogFailure());
	}
}

export default function* watchCatalog() {
	yield* call(initCatalogFromQuery);

	yield* takeLatest(Catalog.actions.catalogRequest.type, catalogSaga);
	yield* takeLatest(Catalog.actions.setSubcategoryId.type, catalogSaga);
	yield* takeLatest(Catalog.actions.navigateToСategory.type, catalogSaga);
	yield* takeLatest(Catalog.actions.navigateToSubcategory.type, catalogSaga);
	yield* takeLatest(Pagination.actions.setCurrentPage.type, catalogSaga);
	yield* takeLatest(Catalog.actions.setSort.type, catalogSaga);
	yield* takeLatest(Filters.actions.setPrice.type, catalogSaga);
	yield* takeLatest(Filters.actions.toggleProducer.type, catalogSaga);
	yield* takeLatest(Filters.actions.resetFilters.type, catalogSaga);

	yield* takeLatest(Catalog.actions.resetFilters.type, resetSaga);
}	
