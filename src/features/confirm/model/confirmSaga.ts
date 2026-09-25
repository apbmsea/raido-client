import { call, put, takeLatest } from 'typed-redux-saga';
import { Confirm } from '..';
import { confirm, type ConfirmPayload } from '@entities/confirm';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Modal } from '@entities/modal';
import { isApiError } from '@shared/utils/errorHandler';
import { User } from '@entities/user';

function* confirmSaga(action: PayloadAction<ConfirmPayload>) {
	try {
		const response = yield* call(confirm, action.payload);
		yield* put(Confirm.actions.confirmSuccess());
		localStorage.setItem('token', response.token)
		yield* put(Modal.actions.closeModal());
		yield* put(User.actions.getUserRequest())
	} catch (error) {
		if (isApiError(error)) {
			yield* put(Confirm.actions.confirmFailure(error.errors));
		} else {
			yield* put(Confirm.actions.confirmFailure({}));
		}
	}
}

export default function* watchConfirm() {
	yield* takeLatest(Confirm.actions.confirmRequest.type, confirmSaga);
}
