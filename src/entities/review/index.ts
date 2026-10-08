import { actions, reducer, name } from './model/reviewSlice';

export { default as watchReview } from './model/reviewSaga';
export { ReviewsList } from './ui/ReviewsList';
export { ReviewTotal } from './ui/ReviewTotal';
export type { AddReviewPayload, ReviewType } from './model/reviewTypes';

export const Review = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
