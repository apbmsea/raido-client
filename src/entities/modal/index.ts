import { actions, reducer, name } from './model/modalSlice';

export { confirmAction, skipConfirmation } from './lib/confirmationSkip';
export type { Confirmation, ModalType } from './model/modalSlice';

export const Modal = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
