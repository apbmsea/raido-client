import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RegisterPayload } from '@entities/register';

interface RegisterState {
	isLoading: boolean;
	errors: Record<string, { message: string }>;
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
		},
		registrationSuccess: state => {
			state.isLoading = false;
		},
		registrationFailure: (
			state,
			action: PayloadAction<Record<string, { message: string }>>
		) => {
			state.isLoading = false;
			state.errors = action.payload;
		},
		clearFieldError: (state, action: PayloadAction<string>) => {
			if (!state.errors) return;
			delete state.errors[action.payload];
		},
		clearAllErrors: state => {
			state.errors = {};
		}
	}
});
