import { call, put, takeLatest } from 'typed-redux-saga';
import { getOffers } from '../api/offersApi';
import { actions } from './offersSlice';

function* getOffersSaga() {
	try {
		const response = yield* call(getOffers);
		yield* put(actions.getOffersSuccess(response.items));
	} catch {
		yield* put(actions.getOffersFailure());
	}
}

export default function* watchOffers() {
	yield* takeLatest(actions.getOffersRequest.type, getOffersSaga);
}
