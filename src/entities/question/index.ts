import { actions, reducer, name } from './model/questionSlice';
export type {
    AskQuestionsPayload,
    GetQuestionsPayload,
    GetQuestionsResponse,
    QuestionType
} from './model/questionType';
export { QuestionsList } from './ui/QuestionsList';

export const Question = {
    reducer: {
        [name]: reducer
    },
    actions,
    name
};
