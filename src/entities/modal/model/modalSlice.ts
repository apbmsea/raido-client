import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ModalType = 'register' | 'login' | 'confirm' | 'confirmSuccess' | 'addManager' | 'addManagerSuccess' | 'deleteManager';

interface ModalState {
	isOpen: boolean;
	type: ModalType | null;
}

const initialState: ModalState = {
	isOpen: false,
	type: null
};

export const { name, actions, reducer } = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal(state, action: PayloadAction<ModalType>) {
			state.isOpen = true;
			state.type = action.payload;
		},
		closeModal(state) {
			state.isOpen = false;
			state.type = null;
		}
	}
});
