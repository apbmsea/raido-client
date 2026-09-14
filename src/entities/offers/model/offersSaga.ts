import { call, put, takeLatest } from 'typed-redux-saga';
import { Offers } from '..';
import { getOffers } from './offersApi';

function* getOffersSaga() {
	try {
		const response = yield* call(getOffers);
		yield* put(Offers.actions.getOffersSuccess(response.items));
	} catch (error) {
		yield* put(Offers.actions.getOffersFailure());
	}
}
export default function* watchOffers() {
	yield* takeLatest(Offers.actions.getOffersRequest.type, getOffersSaga);
}
