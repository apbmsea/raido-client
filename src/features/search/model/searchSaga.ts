import { call, put, takeLatest } from 'typed-redux-saga';
import { Search } from '..';
import type { PayloadAction } from '@reduxjs/toolkit';
import { isApiError } from '@shared/utils/errorHandler';
import { search } from '@entities/search';

function* searchSaga(action: PayloadAction<string>) {
	try {
		const response = yield* call(search, action.payload);
		yield* put(Search.actions.searchSuccess(response));
	} catch (error) {
		if (isApiError(error)) {
			yield* put(Search.actions.searchFailure(error.errors));
		} else {
			yield* put(Search.actions.searchFailure({}));
		}
	}
}

export default function* WatchSearch() {
	yield* takeLatest(Search.actions.searchRequest.type, searchSaga);
}
