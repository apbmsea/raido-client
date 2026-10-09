import { call, put, takeLatest } from 'typed-redux-saga';
import { getManagedOrganizations, getManagers } from '../api/managerApi';
import { actions } from './managerSlice';

function* getManagersSaga() {
	try {
		const response = yield* call(getManagers);
		yield* put(actions.getManagersSuccess(response));
	} catch {
		yield* put(actions.getManagersFailure());
	}
}

function* getManagedOrganizationsSaga() {
	try {
		const response = yield* call(getManagedOrganizations);
		yield* put(actions.getManagedOrganizationsSuccess(response));
	} catch {
		yield* put(actions.getManagedOrganizationsFailure());
	}
}

export default function* watchManager() {
	yield* takeLatest(actions.getManagersRequest.type, getManagersSaga);
	yield* takeLatest(
		actions.getManagedOrganizationsRequest.type,
		getManagedOrganizationsSaga
	);
}
