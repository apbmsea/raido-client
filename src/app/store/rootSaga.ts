import { watchCategories } from '@entities/category';
import watchQuestion from '@entities/question/model/questionSaga';
import watchReview from '@entities/review/model/reviewSaga';
import watchUser from '@entities/user/model/userSaga';
import { WatchConfirm } from '@features/confirm';
import watchLogin from '@features/login/model/loginSaga';
import watchRegister from '@features/register/model/registerSaga';
import { WatchSearch } from '@features/search';
import { watchCatalog } from '@pages/CatalogPage';
import { watchProduct } from '@pages/ProductPage';
import { all } from 'typed-redux-saga';

export default function* rootSaga() {
	yield all([
		watchCategories(),
		watchRegister(),
		WatchConfirm(),
		watchLogin(),
		watchCatalog(),
		WatchSearch(),
		watchProduct(),
		watchReview(),
		watchQuestion(),
		watchUser()
	]);
}
