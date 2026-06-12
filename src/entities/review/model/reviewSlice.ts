import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
	AddReviewsPayload,
	GetReviewsPayload,
	GetReviewsResponse,
	ReviewType
} from './reviewTypes';

interface ReviewState {
	total: number;
	reviews: ReviewType[];
	rating: number;
	counts_of_reviews: {
		1: number;
		2: number;
		3: number;
		4: number;
		5: number;
	};
	isLoading: boolean;
	isFetch: boolean;
}

const initialState: ReviewState = {
	total: 0,
	rating: 5,
	counts_of_reviews: {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0
	},
	reviews: [],
	isLoading: true,
	isFetch: false
};

export const { reducer, actions, name } = createSlice({
	name: 'review',
	initialState,
	reducers: {
		getReviewRequest: (
			state,
			_action: PayloadAction<GetReviewsPayload>
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
		},
		getReviewFailure: state => {
			state.isLoading = false;
		},
		addReviewRequest: (
			state,
			_action: PayloadAction<AddReviewsPayload>
		) => {
			state.isFetch = true;
		},
		addReviewSuccess: state => {
			state.isFetch = false;
		},
		addReviewFailure: state => {
			state.isFetch = false;
		}
	}
});
