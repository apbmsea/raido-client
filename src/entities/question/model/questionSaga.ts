import { call, put, select, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Toast } from '@entities/toast';
import type { RootState } from '@shared/types/store.types';
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

function* getQuestionsMoreSaga(action: PayloadAction<{ productId: number }>) {
	try {
		const page = yield* select(
			(state: RootState) => state.question.paging.page
		);
		const response = yield* call(
			getQuestions,
			action.payload.productId,
			page + 1
		);
		yield* put(actions.getQuestionMoreSuccess(response));
	} catch {
		yield* put(actions.getQuestionMoreFailure());
	}
}

function* askQuestionSaga(action: PayloadAction<AskQuestionPayload>) {
	try {
		yield* call(askQuestion, action.payload);
		yield* put(actions.askQuestionSuccess());
		yield* put(Toast.actions.showToast({ message: 'Вопрос отправлен' }));
		yield* put(
			actions.getQuestionRequest({ productId: action.payload.productId })
		);
	} catch (error) {
		const [firstError] = Object.values(
			getApiErrors(
				error,
				'Не удалось отправить вопрос. Попробуйте ещё раз.'
			)
		);
		yield* put(actions.askQuestionFailure(firstError.message));
	}
}

export default function* watchQuestion() {
	yield* takeLatest(actions.getQuestionRequest.type, getQuestionsSaga);
	yield* takeLatest(
		actions.getQuestionMoreRequest.type,
		getQuestionsMoreSaga
	);
	yield* takeLatest(actions.askQuestionRequest.type, askQuestionSaga);
}
