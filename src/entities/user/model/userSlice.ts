import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiErrors } from '@shared/types/handleError.type';
import type { EditUserPayload, UserType } from './userTypes';
import { readTwoFactorEnabled } from './twoFactorStorage';

interface UserState {
	user: null | UserType;
	isLoading: boolean;
	isLogin: boolean;
	isFetch: boolean;
	isLoggingOut: boolean;
	isMarketingConsentFetch: boolean;
	editErrors: ApiErrors;
	isTwoFactorEnabled: null | boolean;
}

const initialState: UserState = {
	user: null,
	isLoading: true,
	isLogin: false,
	isFetch: false,
	isLoggingOut: false,
	isMarketingConsentFetch: false,
	editErrors: {},
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
			state.user = null;
			state.isLogin = false;
		},
		refreshUserRequest: () => {},
		setUser: (state, action: PayloadAction<UserType>) => {
			state.user = action.payload;
		},
		editUserRequest: (state, _action: PayloadAction<EditUserPayload>) => {
			state.isFetch = true;
			state.editErrors = {};
		},
		editUserSuccess: state => {
			state.isFetch = false;
		},
		editUserFailure: (state, action: PayloadAction<ApiErrors>) => {
			state.isFetch = false;
			state.editErrors = action.payload;
		},
		clearEditErrors: state => {
			state.editErrors = {};
		},
		setMarketingConsentRequest: (state, _action: PayloadAction<boolean>) => {
			state.isMarketingConsentFetch = true;
		},
		setMarketingConsentSuccess: (state, action: PayloadAction<boolean>) => {
			state.isMarketingConsentFetch = false;
			if (state.user) {
				state.user.marketing_email_consent = action.payload;
			}
		},
		setMarketingConsentFailure: state => {
			state.isMarketingConsentFetch = false;
		},
		logoutRequest: state => {
			state.isLoggingOut = true;
		},
		clearUser: state => {
			state.user = null;
			state.isLogin = false;
			state.isLoggingOut = false;
			state.isMarketingConsentFetch = false;
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
