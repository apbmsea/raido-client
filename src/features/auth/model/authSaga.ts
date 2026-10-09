import { call, put, take, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Modal } from '@entities/modal';
import { User } from '@entities/user';
import { removeToken, setToken } from '@shared/api/token';
import { getApiErrors } from '@shared/utils/errorHandler';
import { confirm, login, register } from '../api/authApi';
import type {
	ConfirmPayload,
	LoginPayload,
	RegisterPayload
} from './authTypes';
import { actions as confirmActions } from './confirmSlice';
import { actions as loginActions } from './loginSlice';
import { actions as registerActions } from './registerSlice';

function* loginSaga(action: PayloadAction<LoginPayload>) {
	try {
		const response = yield* call(login, action.payload);
		yield* put(loginActions.loginSuccess());

		if (response.isConfirmRequired) {
			yield* put(
				confirmActions.startConfirm({
					email: action.payload.email,
					type: 'login'
				})
			);
			yield* put(Modal.actions.openModal('confirm'));
			return;
		}

		yield* call(setToken, response.token);
		yield* put(User.actions.setTwoFactorEnabled(false));
		yield* put(Modal.actions.closeModal());
		yield* put(User.actions.getUserRequest());
	} catch (error) {
		yield* put(
			loginActions.loginFailure(
				getApiErrors(error, 'Не удалось войти. Проверьте почту и пароль.')
			)
		);
	}
}

function* registerSaga(action: PayloadAction<RegisterPayload>) {
	try {
		yield* call(register, action.payload);
		yield* put(registerActions.registrationSuccess());
		yield* put(
			confirmActions.startConfirm({
				email: action.payload.email,
				type: 'register'
			})
		);
		yield* put(Modal.actions.openModal('confirm'));
	} catch (error) {
		yield* put(
			registerActions.registrationFailure(
				getApiErrors(
					error,
					'Не удалось зарегистрироваться. Попробуйте ещё раз.'
				)
			)
		);
	}
}

function* confirmSaga(action: PayloadAction<ConfirmPayload>) {
	try {
		const response = yield* call(confirm, action.payload);
		yield* put(confirmActions.confirmSuccess());

		if (action.payload.url === '2fa/switch') {
			yield* put(User.actions.toggleTwoFactorEnabled());
			yield* put(Modal.actions.openModal('confirmSuccess'));
			return;
		}

		if (action.payload.url === 'password/change') {
			yield* call(removeToken);
			yield* put(Modal.actions.openModal('confirmSuccess'));
			yield* take([
				Modal.actions.closeModal.type,
				Modal.actions.openModal.type
			]);
			yield* put(User.actions.clearUser());
			return;
		}

		if (response.token) {
			yield* call(setToken, response.token);
		}
		yield* put(
			User.actions.setTwoFactorEnabled(
				action.payload.url === 'login' ? true : null
			)
		);
		yield* put(Modal.actions.closeModal());
		yield* put(User.actions.getUserRequest());
	} catch (error) {
		yield* put(
			confirmActions.confirmFailure(
				getApiErrors(
					error,
					'Не удалось подтвердить код. Попробуйте ещё раз.'
				)
			)
		);
	}
}

export default function* watchAuth() {
	yield* takeLatest(loginActions.loginRequest.type, loginSaga);
	yield* takeLatest(registerActions.registrationRequest.type, registerSaga);
	yield* takeLatest(confirmActions.confirmRequest.type, confirmSaga);
}
