import { call, put, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getApiErrors } from '@shared/utils/errorHandler';
import { addReview, getReviews } from '../api/reviewApi';
import { actions } from './reviewSlice';
import type { AddReviewPayload } from './reviewTypes';

function* getReviewsSaga(action: PayloadAction<{ productId: number }>) {
	try {
		const response = yield* call(getReviews, action.payload.productId);
		yield* put(actions.getReviewSuccess(response));
	} catch {
		yield* put(actions.getReviewFailure());
	}
}

function* addReviewSaga(action: PayloadAction<AddReviewPayload>) {
	try {
		yield* call(addReview, action.payload);
		yield* put(actions.addReviewSuccess());
		yield* put(
			actions.getReviewRequest({ productId: action.payload.productId })
		);
	} catch (error) {
		const [firstError] = Object.values(
			getApiErrors(error, 'Не удалось отправить отзыв. Попробуйте ещё раз.')
		);
		yield* put(actions.addReviewFailure(firstError.message));
	}
}

export default function* watchReview() {
	yield* takeLatest(actions.getReviewRequest.type, getReviewsSaga);
	yield* takeLatest(actions.addReviewRequest.type, addReviewSaga);
}
