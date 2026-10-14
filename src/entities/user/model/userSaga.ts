import { call, put, select, takeEvery, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Toast } from '@entities/toast';
import { removeToken } from '@shared/api/token';
import type { RootState } from '@shared/types/store.types';
import { getApiErrors, isApiError } from '@shared/utils/errorHandler';
import {
	editUser,
	getUser,
	logoutUser,
	setMarketingEmailConsent
} from '../api/userApi';
import { saveTwoFactorEnabled } from './twoFactorStorage';
import { actions } from './userSlice';
import type { EditUserPayload } from './userTypes';

function* getUserSaga() {
	try {
		const response = yield* call(getUser);
		yield* put(actions.getUserSuccess(response));
	} catch (error) {
		if (isApiError(error) && error.status === 401) {
			yield* call(removeToken);
		}
		yield* put(actions.getUserFailure());
	}
}

function* refreshUserSaga() {
	try {
		const response = yield* call(getUser);
		yield* put(actions.setUser(response));
	} catch {}
}

function* editUserSaga(action: PayloadAction<EditUserPayload>) {
	try {
		yield* call(editUser, action.payload);
		yield* put(actions.editUserSuccess());
		yield* refreshUserSaga();
	} catch (error) {
		yield* put(
			actions.editUserFailure(
				getApiErrors(
					error,
					'Не удалось сохранить изменения. Попробуйте ещё раз.'
				)
			)
		);
	}
}

function* setMarketingConsentSaga(action: PayloadAction<boolean>) {
	const allowed = action.payload;
	try {
		yield* call(setMarketingEmailConsent, allowed);
		yield* put(actions.setMarketingConsentSuccess(allowed));
		yield* put(
			Toast.actions.showToast({
				message: allowed
					? 'Вы подписались на рассылку'
					: 'Вы отписались от рассылки'
			})
		);
	} catch {
		yield* put(actions.setMarketingConsentFailure());
		yield* put(
			Toast.actions.showToast({
				message: allowed
					? 'Не удалось подписаться на рассылку. Попробуйте ещё раз.'
					: 'Не удалось отписаться от рассылки. Попробуйте ещё раз.',
				variant: 'error'
			})
		);
	}
}

function* logoutSaga() {
	try {
		yield* call(logoutUser);
	} catch {} finally {
		yield* call(removeToken);
		yield* put(actions.clearUser());
	}
}

function* persistTwoFactorSaga() {
	const isTwoFactorEnabled = yield* select(
		(state: RootState) => state.user.isTwoFactorEnabled
	);
	yield* call(saveTwoFactorEnabled, isTwoFactorEnabled);
}

export default function* watchUser() {
	yield* takeEvery(
		[
			actions.setTwoFactorEnabled.type,
			actions.toggleTwoFactorEnabled.type,
			actions.clearUser.type
		],
		persistTwoFactorSaga
	);
	yield* takeLatest(actions.getUserRequest.type, getUserSaga);
	yield* takeLatest(actions.refreshUserRequest.type, refreshUserSaga);
	yield* takeLatest(actions.editUserRequest.type, editUserSaga);
	yield* takeLatest(
		actions.setMarketingConsentRequest.type,
		setMarketingConsentSaga
	);
	yield* takeLatest(actions.logoutRequest.type, logoutSaga);
}
