import { call, put, select, takeEvery, takeLatest } from 'typed-redux-saga';
import type { RootState } from '@shared/types/store.types';
import { saveTwoFactorEnabled } from './twoFactorStorage';
import { User } from '..';
import { editUser, getUser } from './userApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { EditUserPayload } from './userTypes';

function* getUserSaga() {
	try {
		const response = yield* call(getUser);
		yield* put(User.actions.getUserSuccess(response));
	} catch (error) {
		yield* put(User.actions.getUserFailure());
	}
}

function* editUserSaga(action: PayloadAction<EditUserPayload>) {
	try {
		yield* call(editUser, action.payload);
		yield* put(User.actions.editUserSuccess());
	} catch (error) {
		yield* put(User.actions.editUserFailure());
	}
}

function* persistTwoFactorSaga() {
	const isTwoFactorEnabled = yield* select(
		(state: RootState) => state.user.isTwoFactorEnabled
	);
	saveTwoFactorEnabled(isTwoFactorEnabled);
}

export default function* watchUser() {
	yield* takeEvery(
		[
			User.actions.setTwoFactorEnabled.type,
			User.actions.toggleTwoFactorEnabled.type,
			User.actions.clearUser.type
		],
		persistTwoFactorSaga
	);
	yield* takeLatest(User.actions.getUserRequest, getUserSaga);
	yield* takeLatest(User.actions.editUserRequest, editUserSaga);
	yield* takeLatest(User.actions.editUserSuccess, getUserSaga);
}
