import { actions, reducer, name } from './model/modalSlice';

export type { ModalType } from './model/modalSlice';

/** Какое модальное окно сейчас открыто. Сами окна собирает widgets/ModalRoot */
export const Modal = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
