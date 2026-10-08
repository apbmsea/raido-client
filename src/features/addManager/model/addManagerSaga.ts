import { call, put, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { addManager, Manager } from '@entities/manager';
import { Modal } from '@entities/modal';
import { getApiErrors } from '@shared/utils/errorHandler';

function* addManagerSaga(action: PayloadAction<{ email: string }>) {
	try {
		yield* call(addManager, action.payload.email);
		yield* put(Manager.actions.addManagerSuccess());
		yield* put(Modal.actions.openModal('addManagerSuccess'));
	} catch (error) {
		yield* put(
			Manager.actions.addManagerFailure(
				getApiErrors(
					error,
					'Не удалось отправить приглашение. Попробуйте ещё раз.'
				)
			)
		);
	}
}

export default function* watchAddManager() {
	yield* takeLatest(Manager.actions.addManagerRequest.type, addManagerSaga);
}
