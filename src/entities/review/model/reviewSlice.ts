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
	AddReviewPayload,
	GetReviewsResponse,
	RatingLevel,
	ReviewType
} from './reviewTypes';

interface ReviewState {
	total: number;
	reviews: ReviewType[];
	rating: number;
	counts_of_reviews: Record<RatingLevel, number>;
	isLoading: boolean;
	paging: PagingState;
	isFetch: boolean;
	submitError: string;
	submittedCount: number;
}

const initialState: ReviewState = {
	total: 0,
	rating: 0,
	counts_of_reviews: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
	reviews: [],
	isLoading: true,
	paging: initialPaging,
	isFetch: false,
	submitError: '',
	submittedCount: 0
};

export const { reducer, actions, name } = createSlice({
	name: 'review',
	initialState,
	reducers: {
		getReviewRequest: (
			state,
			_action: PayloadAction<{ productId: number }>
		) => {
			state.isLoading = true;
		},
		getReviewSuccess: (
			state,
			action: PayloadAction<GetReviewsResponse>
		) => {
			state.isLoading = false;
			state.reviews = action.payload.items;
			state.total = action.payload.total;
			state.rating = action.payload.rating;
			state.counts_of_reviews = action.payload.counts_of_reviews;
			state.paging = toPaging(action.payload);
		},
		getReviewFailure: state => {
			state.isLoading = false;
		},
		getReviewMoreRequest: (
			state,
			_action: PayloadAction<{ productId: number }>
		) => startNextPage(state.paging),
		getReviewMoreSuccess: (
			state,
			action: PayloadAction<GetReviewsResponse>
		) => applyNextPage(state.paging, state.reviews, action.payload),
		getReviewMoreFailure: state => failNextPage(state.paging),
		addReviewRequest: (
			state,
			_action: PayloadAction<AddReviewPayload>
		) => {
			state.isFetch = true;
			state.submitError = '';
		},
		addReviewSuccess: state => {
			state.isFetch = false;
			state.submittedCount += 1;
		},
		addReviewFailure: (state, action: PayloadAction<string>) => {
			state.isFetch = false;
			state.submitError = action.payload;
		},
		clearReviews: state => ({
			...initialState,
			submittedCount: state.submittedCount
		})
	}
});
