import { call, put, takeLatest } from 'typed-redux-saga';
import { getCategories } from '../api/categoryApi';
import { actions } from './categoriesSlice';

function* getCategoriesSaga() {
	try {
		const categories = yield* call(getCategories);
		yield* put(actions.getCategoriesSuccess(categories));
	} catch {
		yield* put(actions.getCategoriesFailure());
	}
}

export default function* watchCategories() {
	yield* takeLatest(actions.getCategoriesRequest.type, getCategoriesSaga);
}
