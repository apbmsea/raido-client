import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiErrors } from '@shared/types/handleError.type';
import type { LoginPayload } from './authTypes';

interface LoginState {
	isLoading: boolean;
	errors: ApiErrors;
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
			state.errors = {};
		},
		loginSuccess: state => {
			state.isLoading = false;
		},
		loginFailure: (state, action: PayloadAction<ApiErrors>) => {
			state.isLoading = false;
			state.errors = action.payload;
		},
		clearAllErrors: state => {
			state.errors = {};
		}
	}
});
