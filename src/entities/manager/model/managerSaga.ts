import { call, put, takeLatest } from 'typed-redux-saga';
import { Manager } from '..';
import { addManager, getManagers, removeManager } from './managerApi';
import type { PayloadAction } from '@reduxjs/toolkit';
import { isApiError } from '@shared/utils/errorHandler';
import { Modal } from '@entities/modal';

function* getManagersSaga() {
	try {
		const response = yield* call(getManagers);
		yield* put(Manager.actions.getManagersSuccess(response));
	} catch (error) {
		yield* put(Manager.actions.getManagersFailure());
	}
}

function* addManagerSaga(action: PayloadAction<{ email: string }>) {
	try {
		yield* call(addManager, action.payload.email);
		yield* put(Manager.actions.addManagerSuccess());
		yield* put(Modal.actions.openModal('addManagerSuccess'));
	} catch (error) {
		if (isApiError(error)) {
			yield* put(Manager.actions.addManagerFailure(error.errors));
		} else {
			yield* put(Manager.actions.addManagerFailure({}));
		}
	}
}

function* removeManagerSaga(action: PayloadAction<{ assignment_id: number }>) {
	try {
		yield* call(removeManager, action.payload.assignment_id);
		yield* put(Manager.actions.removeManagerSuccess());
		yield* put(Modal.actions.closeModal());
	} catch (error) {
		yield* put(Manager.actions.removeManagerFailure());
	}
}

export default function* watchManager() {
	yield* takeLatest(Manager.actions.getManagersRequest.type, getManagersSaga);
	yield* takeLatest(
		Manager.actions.removeManagerSuccess.type,
		getManagersSaga
	);
	yield* takeLatest(Manager.actions.addManagerRequest.type, addManagerSaga);
	yield* takeLatest(
		Manager.actions.removeManagerRequest.type,
		removeManagerSaga
	);
}
