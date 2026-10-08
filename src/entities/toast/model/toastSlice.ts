import {
	createSlice,
	nanoid,
	type PayloadAction,
	type UnknownAction
} from '@reduxjs/toolkit';

export type ToastVariant = 'success' | 'info' | 'error';

export interface ToastItem {
	id: string;
	message: string;
	variant: ToastVariant;
	/** Действие, которое отменяет только что сделанное: его отправит кнопка «Отменить» */
	undoAction?: UnknownAction;
}

export type ShowToastPayload = {
	message: string;
	variant?: ToastVariant;
	undoAction?: UnknownAction;
};

/** Сколько плашка остаётся на экране — и сколько времени есть на отмену */
export const TOAST_DURATION = 5000;

interface ToastState {
	/** На экране всегда одна плашка: новая заменяет прежнюю */
	current: ToastItem | null;
}

const initialState: ToastState = {
	current: null
};

export const { name, actions, reducer } = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		showToast: {
			reducer(state, action: PayloadAction<ToastItem>) {
				state.current = action.payload;
			},
			prepare({ variant = 'success', ...toast }: ShowToastPayload) {
				return { payload: { ...toast, variant, id: nanoid() } };
			}
		},
		// По id, чтобы таймер прежней плашки не закрыл ту, что её заменила
		hideToast(state, action: PayloadAction<string>) {
			if (state.current?.id === action.payload) state.current = null;
		}
	}
});
