import { call, put, takeLatest } from 'typed-redux-saga';
import { Login } from '..';
import { login, type LoginPayload } from '@entities/login';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Confirm } from '@features/confirm';
import { Modal } from '@features/modal';
import { isApiError } from '@shared/utils/errorHandler';
import { User } from '@entities/user';

function* loginSaga(action: PayloadAction<LoginPayload>) {
	try {
		const response = yield* call(login, action.payload);
		localStorage.setItem('token', response.token)
		yield* put(Confirm.actions.setEmail(action.payload.email));
		yield* put(Confirm.actions.setType('login'));
		yield* put(Login.actions.loginSuccess());
		yield* put(Modal.actions.closeModal());
		yield* put(User.actions.getUserRequest())
	} catch (error) {
		if (isApiError(error)) {
			yield* put(Login.actions.loginFailure(error.errors));
		} else {
			yield* put(Login.actions.loginFailure({}));
		}
	}
}

export default function* watchLogin() {
	yield* takeLatest(Login.actions.loginRequest.type, loginSaga);
}
