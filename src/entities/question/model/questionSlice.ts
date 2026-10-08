import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
	AskQuestionPayload,
	GetQuestionsResponse,
	QuestionType
} from './questionTypes';

interface QuestionState {
	total: number;
	questions: QuestionType[];
	isLoading: boolean;
	isFetch: boolean;
	submitError: string;
	/** Растёт с каждым отправленным вопросом — по нему форма сбрасывает поля */
	submittedCount: number;
}

const initialState: QuestionState = {
	total: 0,
	questions: [],
	isLoading: true,
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
		},
		getQuestionFailure: state => {
			state.isLoading = false;
		},
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
