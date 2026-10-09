import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiErrors } from '@shared/types/handleError.type';
import type { ConfirmPayload, ConfirmType } from './authTypes';

interface ConfirmState {
	isLoading: boolean;
	errors: ApiErrors;
	email: string;
	type: ConfirmType;
}

const initialState: ConfirmState = {
	isLoading: false,
	errors: {},
	email: '',
	type: 'register'
};

export const { reducer, actions, name } = createSlice({
	name: 'confirm',
	initialState,
	reducers: {
		startConfirm: (
			state,
			action: PayloadAction<{ email: string; type: ConfirmType }>
		) => {
			state.email = action.payload.email;
			state.type = action.payload.type;
			state.errors = {};
		},
		confirmRequest: (state, _action: PayloadAction<ConfirmPayload>) => {
			state.isLoading = true;
			state.errors = {};
		},
		confirmSuccess: state => {
			state.isLoading = false;
		},
		confirmFailure: (state, action: PayloadAction<ApiErrors>) => {
			state.isLoading = false;
			state.errors = action.payload;
		},
		clearAllErrors: state => {
			state.errors = {};
		}
	}
});
