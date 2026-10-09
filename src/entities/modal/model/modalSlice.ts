import {
	createSlice,
	type PayloadAction,
	type UnknownAction
} from '@reduxjs/toolkit';

export type ModalType =
	| 'register'
	| 'login'
	| 'confirm'
	| 'confirmSuccess'
	| 'addManager'
	| 'addManagerSuccess'
	| 'deleteManager'
	| 'confirmAction'
	| 'orderCreated';

export interface Confirmation {
	title: string;
	text?: string;
	confirmLabel: string;
	action: UnknownAction;
	skipKey?: string;
}

interface ModalState {
	type: ModalType | null;
	confirmation: Confirmation | null;
}

const initialState: ModalState = {
	type: null,
	confirmation: null
};

export const { name, actions, reducer } = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal(state, action: PayloadAction<ModalType>) {
			state.type = action.payload;
			state.confirmation = null;
		},
		openConfirmation(state, action: PayloadAction<Confirmation>) {
			state.type = 'confirmAction';
			state.confirmation = action.payload;
		},
		closeModal(state) {
			state.type = null;
			state.confirmation = null;
		}
	}
});
