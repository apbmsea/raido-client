import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
	AskQuestionsPayload,
	GetQuestionsPayload,
	GetQuestionsResponse,
	QuestionType
} from './questionType';

interface QuestionState {
	questions: QuestionType[];
	isLoading: boolean;
	isFetch: boolean;
}

const initialState: QuestionState = {
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
