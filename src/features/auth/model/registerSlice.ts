import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiErrors } from '@shared/types/handleError.type';
import type { RegisterPayload } from './authTypes';

interface RegisterState {
	isLoading: boolean;
	errors: ApiErrors;
}

const initialState: RegisterState = {
	isLoading: false,
	errors: {}
};

export const { reducer, actions, name } = createSlice({
	name: 'register',
	initialState,
	reducers: {
		registrationRequest: (
			state,
			_action: PayloadAction<RegisterPayload>
		) => {
			state.isLoading = true;
			state.errors = {};
		},
		registrationSuccess: state => {
			state.isLoading = false;
		},
		registrationFailure: (state, action: PayloadAction<ApiErrors>) => {
			state.isLoading = false;
			state.errors = action.payload;
		},
		clearAllErrors: state => {
			state.errors = {};
		}
	}
});
