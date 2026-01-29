import { call, put, takeLatest } from 'typed-redux-saga';
import { Categories } from '..';
import { getCategories } from './categories.api';

function* getCategoriesSaga() {
	try {
		const categories = yield* call(getCategories);
		yield* put(Categories.actions.getCategoriesSuccess(categories));
	} catch (error: unknown) {
		console.error('Get categories error:', error);
		yield* put(Categories.actions.getCategoriesFailure());
	}
}

export default function* watchCategories() {
	yield* takeLatest(
		Categories.actions.getCategoriesRequest.type,
		getCategoriesSaga
	);
}
