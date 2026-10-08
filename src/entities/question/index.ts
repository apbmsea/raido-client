import { actions, reducer, name } from './model/questionSlice';

export { default as watchQuestion } from './model/questionSaga';
export { QuestionsList } from './ui/QuestionsList';
export type { AskQuestionPayload, QuestionType } from './model/questionTypes';

export const Question = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
