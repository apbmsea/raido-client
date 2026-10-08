import { call, put, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Manager, removeManager } from '@entities/manager';
import { Modal } from '@entities/modal';
import { getApiErrors } from '@shared/utils/errorHandler';

function* deleteManagerSaga(action: PayloadAction<{ assignmentId: number }>) {
	try {
		yield* call(removeManager, action.payload.assignmentId);
		yield* put(Manager.actions.removeManagerSuccess());
		yield* put(Modal.actions.closeModal());
		yield* put(Manager.actions.getManagersRequest());
	} catch (error) {
		yield* put(
			Manager.actions.removeManagerFailure(
				getApiErrors(
					error,
					'Не удалось удалить менеджера. Попробуйте ещё раз.'
				)
			)
		);
	}
}

export default function* watchDeleteManager() {
	yield* takeLatest(
		Manager.actions.removeManagerRequest.type,
		deleteManagerSaga
	);
}
