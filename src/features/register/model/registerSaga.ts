import { call, put, takeLatest } from 'typed-redux-saga';
import { Register } from '..';
import { register, type RegisterPayload } from '@entities/register';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Confirm } from '@features/confirm';
import { Modal } from '@features/modal';
import { isApiError } from '@shared/utils/errorHandler';

function* registerSaga(action: PayloadAction<RegisterPayload>) {
	try {
		yield* call(register, action.payload);
		yield* put(Confirm.actions.setEmail(action.payload.email));
		yield* put(Confirm.actions.setType('register'));
		yield* put(Register.actions.registrationSuccess());
		yield* put(Modal.actions.openModal('confirm'));
	} catch (error) {
		if (isApiError(error)) {
			yield* put(Register.actions.registrationFailure(error.errors));
		} else {
			yield* put(Register.actions.registrationFailure({}));
		}
	}
}

export default function* watchRegister() {
	yield* takeLatest(Register.actions.registrationRequest.type, registerSaga);
}
