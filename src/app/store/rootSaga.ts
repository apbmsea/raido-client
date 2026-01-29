import { watchCategories } from '@entities/category';
import { all } from 'typed-redux-saga';

export default function* rootSaga() {
	yield all([watchCategories()]);
}
