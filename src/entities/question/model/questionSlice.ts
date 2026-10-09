import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
	applyNextPage,
	failNextPage,
	initialPaging,
	startNextPage,
	toPaging,
	type PagingState
} from '@shared/utils/pagination';
import type {
	AskQuestionPayload,
	GetQuestionsResponse,
	QuestionType
} from './questionTypes';

interface QuestionState {
	total: number;
	questions: QuestionType[];
	isLoading: boolean;
	paging: PagingState;
	isFetch: boolean;
	submitError: string;
	submittedCount: number;
}

const initialState: QuestionState = {
	total: 0,
	questions: [],
	isLoading: true,
	paging: initialPaging,
	isFetch: false,
	submitError: '',
	submittedCount: 0
};

export const { reducer, actions, name } = createSlice({
	name: 'question',
	initialState,
	reducers: {
		getQuestionRequest: (
			state,
			_action: PayloadAction<{ productId: number }>
		) => {
			state.isLoading = true;
		},
		getQuestionSuccess: (
			state,
			action: PayloadAction<GetQuestionsResponse>
		) => {
			state.isLoading = false;
			state.questions = action.payload.items;
			state.total = action.payload.total;
			state.paging = toPaging(action.payload);
		},
		getQuestionFailure: state => {
			state.isLoading = false;
		},
		getQuestionMoreRequest: (
			state,
			_action: PayloadAction<{ productId: number }>
		) => startNextPage(state.paging),
		getQuestionMoreSuccess: (
			state,
			action: PayloadAction<GetQuestionsResponse>
		) => applyNextPage(state.paging, state.questions, action.payload),
		getQuestionMoreFailure: state => failNextPage(state.paging),
		askQuestionRequest: (
			state,
			_action: PayloadAction<AskQuestionPayload>
		) => {
			state.isFetch = true;
			state.submitError = '';
		},
		askQuestionSuccess: state => {
			state.isFetch = false;
			state.submittedCount += 1;
		},
		askQuestionFailure: (state, action: PayloadAction<string>) => {
			state.isFetch = false;
			state.submitError = action.payload;
		},
		clearQuestions: state => ({
			...initialState,
			submittedCount: state.submittedCount
		})
	}
});
