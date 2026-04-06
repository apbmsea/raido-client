import { call, put, select, takeLatest } from 'typed-redux-saga';
import { Catalog } from '..';
import { getProducts } from '@entities/catalog/model/catalog.api';
import { selectCatalogQuery } from './catalogQuery.selector';
import { Pagination } from '../features/pagination';

function* catalogSaga() {
	try {
		const query = yield* select(selectCatalogQuery);
		const response = yield* call(getProducts, query);

		yield* put(Pagination.actions.setTotalPages(response.total_pages));
		yield* put(Catalog.actions.catalogSuccess(response.items));
	} catch (error) {
		Catalog.actions.catalogFailure();
	}
}

export default function* watchCatalog() {
	yield* takeLatest(Catalog.actions.catalogRequest.type, catalogSaga);
	yield* takeLatest(Pagination.actions.setCurrentPage.type, catalogSaga);
}
