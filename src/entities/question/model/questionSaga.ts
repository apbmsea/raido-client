import { call, put, takeLatest } from 'typed-redux-saga';
import {
	Question,
	type AskQuestionsPayload,
	type GetQuestionsPayload
} from '..';
import { askQuestion, getQuestions } from './questionApi';
import type { PayloadAction } from '@reduxjs/toolkit';

function* getQuestionsSaga(action: PayloadAction<GetQuestionsPayload>) {
	try {
		const response = yield* call(getQuestions, action.payload);
		yield* put(Question.actions.getQuestionSuccess(response));
	} catch (error) {
		yield* put(Question.actions.getQuestionFailure());
	}
}

function* askQuestionsSaga(action: PayloadAction<AskQuestionsPayload>) {
	try {
		yield* call(askQuestion, action.payload);
		yield* put(Question.actions.askQuestionSuccess());
		yield* put(
			Question.actions.getQuestionRequest({
				productId: action.payload.productId
			})
		);
	} catch (error) {
		yield* put(Question.actions.askQuestionFailure());
	}
}

export default function* watchQuestion() {
	yield* takeLatest(
		Question.actions.getQuestionRequest.type,
		getQuestionsSaga
	);
	yield* takeLatest(
		Question.actions.askQuestionRequest.type,
		askQuestionsSaga
	);
}
