import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EditUserPayload, UserType } from './userTypes';
import { readTwoFactorEnabled } from './twoFactorStorage';

interface UserState {
	user: null | UserType;
	isLoading: boolean;
	isLogin: boolean;
	isFetch: boolean;
	isTwoFactorEnabled: null | boolean;
}

const initialState: UserState = {
	user: null,
	isLoading: true,
	isLogin: false,
	isFetch: false,
	isTwoFactorEnabled: readTwoFactorEnabled()
};

export const { reducer, actions, name } = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getUserRequest: state => {
			state.isLoading = true;
		},
		getUserSuccess: (state, action: PayloadAction<UserType>) => {
			state.isLoading = false;
			state.user = action.payload;
			state.isLogin = true;
		},
		getUserFailure: state => {
			state.isLoading = false;
			state.isLogin = false;
		},
		editUserRequest: (state, _action: PayloadAction<EditUserPayload>) => {
			state.isFetch = true;
		},
		editUserSuccess: state => {
			state.isFetch = false;
		},
		editUserFailure: state => {
			state.isFetch = false;
		},
		clearUser: state => {
			state.user = null;
			state.isLogin = false;
			state.isTwoFactorEnabled = null;
		},
		setTwoFactorEnabled: (
			state,
			action: PayloadAction<null | boolean>
		) => {
			state.isTwoFactorEnabled = action.payload;
		},
		toggleTwoFactorEnabled: state => {
			if (state.isTwoFactorEnabled !== null) {
				state.isTwoFactorEnabled = !state.isTwoFactorEnabled;
			}
		}
	}
});
