import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
	AskQuestionsPayload,
	GetQuestionsPayload,
	GetQuestionsResponse,
	QuestionType
} from './questionType';

interface QuestionState {
	total: number;
	questions: QuestionType[];
	isLoading: boolean;
	isFetch: boolean;
}

const initialState: QuestionState = {
	total: 0,
	questions: [],
	isLoading: true,
	isFetch: false
};

export const { reducer, actions, name } = createSlice({
	name: 'question',
	initialState,
	reducers: {
		getQuestionRequest: (
			state,
			_action: PayloadAction<GetQuestionsPayload>
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
			_action: PayloadAction<AskQuestionsPayload>
		) => {
			state.isFetch = true;
		},
		askQuestionSuccess: state => {
			state.isFetch = false;
		},
		askQuestionFailure: state => {
			state.isFetch = false;
		}
	}
});
