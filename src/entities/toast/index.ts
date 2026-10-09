import { actions, reducer, name } from './model/toastSlice';

export { TOAST_DURATION } from './model/toastSlice';
export type {
	ShowToastPayload,
	ToastItem,
	ToastVariant
} from './model/toastSlice';

export const Toast = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
