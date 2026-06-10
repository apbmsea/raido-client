import { actions, reducer, name } from './model/reviewSlice';

export { ReviewsList } from './ui/ReviewsList';
export type {
	GetReviewsPayload,
	GetReviewsResponse,
    AddReviewsPayload,
	ReviewType
} from './model/reviewTypes';

export const Review = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
