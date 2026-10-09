import { call, put, select, takeEvery, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '@entities/product';
import type { RootState } from '@shared/types/store.types';
import { isCatalogPath } from '../lib/catalogPath';
import { actions as catalogActions } from './catalogSlice';
import { actions as filtersActions } from './filtersSlice';
import { actions as paginationActions } from './paginationSlice';
import {
	isSortType,
	PRICE_LIMITS,
	type CatalogView
} from './catalogTypes';
import { saveCatalogView } from './catalogViewStorage';

const isCatalogPage = () => isCatalogPath(window.location.pathname);

function* catalogSaga() {
	try {
		yield* put(catalogActions.catalogPending());

		const { categoryId, subcategoryId, search, sort } = yield* select(
			(state: RootState) => state.catalog
		);
		const { currentPage } = yield* select(
			(state: RootState) => state.pagination
		);
		const { price, selectedProducers } = yield* select(
			(state: RootState) => state.filters
		);

		const params = new URLSearchParams();

		if (categoryId) params.set('category_id', String(categoryId));
		if (subcategoryId) params.set('subcategory_id', String(subcategoryId));
		if (search) params.set('search', search);
		if (sort) params.set('sort_by', sort);

		if (price.minPrice > PRICE_LIMITS.minPrice) {
			params.set('min_price', String(price.minPrice));
		}
		if (price.maxPrice < PRICE_LIMITS.maxPrice) {
			params.set('max_price', String(price.maxPrice));
		}

		selectedProducers.forEach(producer => {
			params.append('producer_names', producer.trim());
		});

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

		const totalPages = response.total_pages || 1;

		if (currentPage > totalPages) {
			yield* put(paginationActions.setCurrentPage(totalPages));
			return;
		}

		yield* put(paginationActions.setTotalPages(totalPages));
		yield* put(filtersActions.setProducers(response.producer_names ?? []));
		yield* put(
			catalogActions.catalogSuccess({
				items: response.items,
				total: response.total,
				title:
					response.subcategory_name ||
					response.category_name ||
					(search ? `Результаты поиска «${search}»` : 'Товары')
			})
		);
	} catch {
		yield* put(catalogActions.catalogFailure());
	}
}

function* initCatalogFromQuery() {
	if (!isCatalogPage()) return;

	const params = new URLSearchParams(window.location.search);

	const categoryId = Number(params.get('category_id'));
	const subcategoryId = Number(params.get('subcategory_id'));
	const search = params.get('search');
	const page = Number(params.get('page'));
	const sort = params.get('sort_by');
	const minPrice = Number(params.get('min_price'));
	const maxPrice = Number(params.get('max_price'));
	const producers = params.getAll('producer_names');

	if (isSortType(sort)) yield* put(catalogActions.setSort(sort));
	if (categoryId) yield* put(catalogActions.setCategoryId(categoryId));
	if (subcategoryId) {
		yield* put(catalogActions.setSubcategoryId(subcategoryId));
	}
	if (search) yield* put(catalogActions.setSearch(search));

	if (minPrice || maxPrice) {
		yield* put(
			filtersActions.setPrice({
				minPrice: minPrice || PRICE_LIMITS.minPrice,
				maxPrice: maxPrice || PRICE_LIMITS.maxPrice
			})
		);
	}

	if (producers.length > 0) {
		yield* put(filtersActions.setSelectedProducers(producers));
	}

	if (page > 1) yield* put(paginationActions.setCurrentPage(page));
}

function* saveViewSaga(action: PayloadAction<CatalogView>) {
	yield* call(saveCatalogView, action.payload);
}

export default function* watchCatalog() {
	yield* call(initCatalogFromQuery);

	yield* takeEvery(catalogActions.setView.type, saveViewSaga);

	yield* takeLatest(
		[
			catalogActions.catalogRequest.type,
			catalogActions.navigateToCategory.type,
			catalogActions.navigateToSubcategory.type,
			catalogActions.navigateToSearch.type,
			catalogActions.setSort.type,
			paginationActions.setCurrentPage.type,
			filtersActions.setPrice.type,
			filtersActions.toggleProducer.type,
			filtersActions.resetFilters.type
		],
		catalogSaga
	);
}
