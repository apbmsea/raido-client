import { put, takeEvery } from 'typed-redux-saga';
import { Cart } from '@entities/cart';
import { Favorite } from '@entities/favorite';
import { Order } from '@entities/order';
import { User } from '@entities/user';

function* loadAccountData() {
	yield* put(Cart.actions.getCartRequest());
	yield* put(Favorite.actions.getFavoriteRequest());
	yield* put(Order.actions.getOrdersRequest());
}

function* clearAccountData() {
	yield* put(Cart.actions.reset());
	yield* put(Favorite.actions.reset());
	yield* put(Order.actions.reset());
}

export default function* watchSession() {
	yield* takeEvery(User.actions.getUserSuccess.type, loadAccountData);
	yield* takeEvery(
		[User.actions.getUserFailure.type, User.actions.clearUser.type],
		clearAccountData
	);
}
