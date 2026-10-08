import { call, put, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getApiErrors } from '@shared/utils/errorHandler';
import { askQuestion, getQuestions } from '../api/questionApi';
import { actions } from './questionSlice';
import type { AskQuestionPayload } from './questionTypes';

function* getQuestionsSaga(action: PayloadAction<{ productId: number }>) {
	try {
		const response = yield* call(getQuestions, action.payload.productId);
		yield* put(actions.getQuestionSuccess(response));
	} catch {
		yield* put(actions.getQuestionFailure());
	}
}

function* askQuestionSaga(action: PayloadAction<AskQuestionPayload>) {
	try {
		yield* call(askQuestion, action.payload);
		yield* put(actions.askQuestionSuccess());
		yield* put(
			actions.getQuestionRequest({ productId: action.payload.productId })
		);
	} catch (error) {
		const [firstError] = Object.values(
			getApiErrors(error, 'Не удалось отправить вопрос. Попробуйте ещё раз.')
		);
		yield* put(actions.askQuestionFailure(firstError.message));
	}
}

export default function* watchQuestion() {
	yield* takeLatest(actions.getQuestionRequest.type, getQuestionsSaga);
	yield* takeLatest(actions.askQuestionRequest.type, askQuestionSaga);
}
