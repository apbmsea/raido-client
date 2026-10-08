import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ModalType =
	| 'register'
	| 'login'
	| 'confirm'
	| 'confirmSuccess'
	| 'addManager'
	| 'addManagerSuccess'
	| 'deleteManager';

interface ModalState {
	type: ModalType | null;
}

const initialState: ModalState = {
	type: null
};

export const { name, actions, reducer } = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal(state, action: PayloadAction<ModalType>) {
			state.type = action.payload;
		},
		closeModal(state) {
			state.type = null;
		}
	}
});
