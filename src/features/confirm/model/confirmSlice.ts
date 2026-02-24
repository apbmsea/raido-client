import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ConfirmPayload } from '@entities/confirm';

type ConfirmType = 'register' | 'login' | '2fa/switch';

interface ConfirmState {
	isLoading: boolean;
	errors: Record<string, { message: string }>;
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
		confirmRequest: (state, _action: PayloadAction<ConfirmPayload>) => {
			state.isLoading = true;
		},
		confirmSuccess: state => {
			state.isLoading = false;
		},
		confirmFailure: (
			state,
			action: PayloadAction<Record<string, { message: string }>>
		) => {
			state.isLoading = false;
			state.errors = action.payload;
		},
		setEmail: (state, action: PayloadAction<string>) => {
			state.email = action.payload;
		},
		setType: (state, action: PayloadAction<ConfirmType>) => {
			state.type = action.payload;
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
