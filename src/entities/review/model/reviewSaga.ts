import { call, put, takeLatest } from 'typed-redux-saga';
import { Review } from '..';
import { addReview, getReviews } from './reviewApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AddReviewsPayload, GetReviewsPayload } from './reviewTypes';

function* getReviewsSaga(action: PayloadAction<GetReviewsPayload>) {
	try {
		const response = yield* call(getReviews, action.payload);
		yield* put(Review.actions.getReviewSuccess(response));
	} catch (error) {
		yield* put(Review.actions.getReviewFailure());
	}
}

function* addReviewsSaga(action: PayloadAction<AddReviewsPayload>) {
	try {
		yield* call(addReview, action.payload);
		yield* put(Review.actions.addReviewSuccess());
		yield* put(
			Review.actions.getReviewRequest({
				productId: action.payload.productId
			})
		);
	} catch (error) {
		yield* put(Review.actions.getReviewFailure());
	}
}

export default function* watchReview() {
	yield* takeLatest(Review.actions.getReviewRequest.type, getReviewsSaga);
	yield* takeLatest(Review.actions.addReviewRequest.type, addReviewsSaga);
}
