import { call, put, select, takeLatest } from 'typed-redux-saga';
import { Catalog } from '..';
import { getProducts } from '@entities/catalog/model/catalog.api';
import type { RootState } from '@shared/types/store.types';

function* catalogSaga() {
	try {
		const selectSubcategoryId = (state: RootState) =>
			state.catalog.subcategoryId;
		const selectCategoryId = (state: RootState) => state.catalog.categoryId;

		const subcategoryId = yield* select(selectSubcategoryId);
		const categoryId = yield* select(selectCategoryId);

		const link = categoryId
			? `category_id=${categoryId}`
			: subcategoryId
				? `subcategory_id=${subcategoryId}`
				: '';
		const response = yield* call(getProducts, link);
		console.log(response.items);

		yield* put(Catalog.actions.catalogSuccess(response.items));
	} catch (error) {
		Catalog.actions.catalogFailure();
	}
}

export default function* watchCatalog() {
	yield* takeLatest(Catalog.actions.catalogRequest.type, catalogSaga);
}
