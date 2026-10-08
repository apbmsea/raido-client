import { all } from 'typed-redux-saga';
import { watchCart } from '@entities/cart';
import { watchCatalog } from '@entities/catalog';
import { watchCategories } from '@entities/category';
import { watchFavorite } from '@entities/favorite';
import { watchManager } from '@entities/manager';
import { watchOffers } from '@entities/offers';
import { watchOrder } from '@entities/order';
import { watchProduct } from '@entities/product';
import { watchQuestion } from '@entities/question';
import { watchReview } from '@entities/review';
import { watchUser } from '@entities/user';
import { watchAddManager } from '@features/addManager';
import { watchAuth } from '@features/auth';
import { watchCheckout } from '@features/checkout';
import { watchDeleteManager } from '@features/deleteManager';
import { watchSearch } from '@features/search';
import watchSession from './sessionSaga';

export default function* rootSaga() {
	yield* all([
		watchCart(),
		watchCatalog(),
		watchCategories(),
		watchFavorite(),
		watchManager(),
		watchOffers(),
		watchOrder(),
		watchProduct(),
		watchQuestion(),
		watchReview(),
		watchUser(),
		watchAddManager(),
		watchAuth(),
		watchCheckout(),
		watchDeleteManager(),
		watchSearch(),
		watchSession()
	]);
}
