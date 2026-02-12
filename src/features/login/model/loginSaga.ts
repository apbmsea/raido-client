import { call, put, takeLatest } from 'typed-redux-saga';
import { Login  } from '..';
import { login, type LoginPayload } from '@entities/login';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Confirm } from '@features/confirm';
import { Modal } from '@features/modal';

function* loginSaga(action: PayloadAction<LoginPayload>) {
	try {
		yield* call(login, action.payload);
		yield* put(Confirm.actions.setEmail(action.payload.email));
		yield* put(Confirm.actions.setType('login'));
		yield* put(Login.actions.loginSuccess());
		yield* put(Modal.actions.openModal('confirm'));
	} catch (error) {
		yield* put(Login.actions.loginFailure({}));
	}
}

export default function* watchLogin() {
	yield* takeLatest(Login.actions.loginRequest.type, loginSaga);
}
