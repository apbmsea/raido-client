import { call, put, select, takeLatest } from 'typed-redux-saga';
import { Catalog } from '..';
import { getProducts } from '@entities/catalog/model/catalog.api';
import { Pagination } from '../features/pagination';
import type { RootState } from '@shared/types/store.types';

function* catalogSaga() {
	try {
		const { subcategoryId, sort } = yield* select(
			(state: RootState) => state.catalog
		);

		const { currentPage } = yield* select(
			(state: RootState) => state.pagination
		);

		const params = new URLSearchParams();

		if (subcategoryId) {
			params.set('subcategory_id', String(subcategoryId));
		}

		if (sort) {
			params.set('sort_by', sort);
		}

		params.set('page', String(currentPage));

		const queryString = params.toString();

		window.history.replaceState(null, '', `?${queryString}`);

		const response = yield* call(getProducts, queryString);

		yield* put(Pagination.actions.setTotalPages(response.total_pages));
		yield* put(Catalog.actions.catalogSuccess(response.items));
		yield* put(Catalog.actions.setTitle(response.subcategory_name || response.category_name))
	} catch (error) {
		yield* put(Catalog.actions.catalogFailure());
	}
}

function* initCatalogFromQuery() {
	const params = new URLSearchParams(window.location.search);

	const subcategoryId = params.get('subcategory_id');
	const page = params.get('page');
	const sort = params.get('sort_by');

	if (sort) {
		yield* put(Catalog.actions.setSort(sort as any));
	}

	if (subcategoryId) {
		yield* put(Catalog.actions.setSubcategoryId(Number(subcategoryId)));
	}

	if (page) {
		yield* put(Pagination.actions.setCurrentPage(Number(page)));
	}

	yield* put(Catalog.actions.catalogRequest());
}

function* resetSaga() {
	try {
		yield* put(Pagination.actions.setCurrentPage(1));
		yield* put(Pagination.actions.setTotalPages(1));
	} catch (error) {
		yield* put(Catalog.actions.catalogFailure());
	}
}

export default function* watchCatalog() {
	yield* call(initCatalogFromQuery);

	yield* takeLatest(Catalog.actions.catalogRequest.type, catalogSaga);
	yield* takeLatest(Catalog.actions.setSubcategoryId.type, catalogSaga);
	yield* takeLatest(Catalog.actions.navigateToSubcategory.type, catalogSaga);
	yield* takeLatest(Pagination.actions.setCurrentPage.type, catalogSaga);
	yield* takeLatest(Catalog.actions.setSort.type, catalogSaga);
	yield* takeLatest(Catalog.actions.resetFilters.type, resetSaga);
}
