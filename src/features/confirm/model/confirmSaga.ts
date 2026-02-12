import { call, put, takeLatest } from 'typed-redux-saga';
import { Confirm } from '..';
import { confirm, type ConfirmPayload } from '@entities/confirm';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Modal } from '@features/modal';

function* confirmSaga(action: PayloadAction<ConfirmPayload>) {
	try {
		const response = yield* call(confirm, action.payload);
		yield* put(Confirm.actions.confirmSuccess());
		localStorage.setItem('token', response.token)
		yield* put(Modal.actions.closeModal());
	} catch (error) {
		yield* put(Confirm.actions.confirmFailure({}));
	}
}

export default function* watchConfirm() {
	yield* takeLatest(Confirm.actions.confirmRequest.type, confirmSaga);
}
