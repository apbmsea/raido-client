import { call, delay, put, takeLatest } from 'typed-redux-saga';
import type { PayloadAction } from '@reduxjs/toolkit';
import { searchSuggestions } from '../api/searchApi';
import { actions } from './searchSlice';

const DEBOUNCE_MS = 400;

function* searchSaga(action: PayloadAction<string>) {
	const query = action.payload.trim();
	if (!query) return;

	yield* delay(DEBOUNCE_MS);

	try {
		const response = yield* call(searchSuggestions, query);
		yield* put(actions.searchSuccess(response));
	} catch {
		yield* put(actions.searchFailure());
	}
}

export default function* watchSearch() {
	yield* takeLatest(actions.setQuery.type, searchSaga);
}
