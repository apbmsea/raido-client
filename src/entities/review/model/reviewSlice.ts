import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
	AddReviewsPayload,
	GetReviewsPayload,
	GetReviewsResponse,
	ReviewType
} from './reviewTypes';

interface ReviewState {
	reviews: ReviewType[];
	isLoading: boolean;
	isFetch: boolean;
}

const initialState: ReviewState = {
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
