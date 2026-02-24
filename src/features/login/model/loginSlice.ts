import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LoginPayload } from '@entities/login';

interface LoginState {
	isLoading: boolean;
	errors: Record<string, { message: string }>;
}

const initialState: LoginState = {
	isLoading: false,
	errors: {}
};

export const { reducer, actions, name } = createSlice({
	name: 'login',
	initialState,
	reducers: {
		loginRequest: (state, _action: PayloadAction<LoginPayload>) => {
			state.isLoading = true;
		},
		loginSuccess: state => {
			state.isLoading = false;
		},
		loginFailure: (
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
