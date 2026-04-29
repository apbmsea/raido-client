import { call, put, select, takeLatest } from 'typed-redux-saga';
import { Catalog } from '..';
import { getProducts } from '@entities/catalog/model/catalog.api';
import { Pagination } from '../features/pagination';
import type { RootState } from '@shared/types/store.types';

function* catalogSaga() {
	try {
		const { subcategoryId } = yield* select(
			(state: RootState) => state.catalog
		);

		const { currentPage } = yield* select(
			(state: RootState) => state.pagination
		);

		const params = new URLSearchParams();

		if (subcategoryId) {
			params.set('subcategory_id', String(subcategoryId));
		}

		params.set('page', String(currentPage));

		const queryString = params.toString();

		window.history.replaceState(null, '', `?${queryString}`);

		const response = yield* call(getProducts, queryString);

		yield* put(Pagination.actions.setTotalPages(response.total_pages));
		yield* put(Catalog.actions.catalogSuccess(response.items));
	} catch (error) {
		yield* put(Catalog.actions.catalogFailure());
	}
}

function* initCatalogFromQuery() {
	const params = new URLSearchParams(window.location.search);

	const subcategoryId = params.get('subcategory_id');
	const page = params.get('page');

	if (subcategoryId) {
		yield* put(Catalog.actions.setSubcategoryId(Number(subcategoryId)));
	}

	if (page) {
		yield* put(Pagination.actions.setCurrentPage(Number(page)));
	}

	yield* put(Catalog.actions.catalogRequest());
}


export default function* watchCatalog() {
	yield* call(initCatalogFromQuery);

	yield* takeLatest(Catalog.actions.catalogRequest.type, catalogSaga);
	yield* takeLatest(Catalog.actions.setSubcategoryId.type, catalogSaga);
	yield* takeLatest(Pagination.actions.setCurrentPage.type, catalogSaga);
}
