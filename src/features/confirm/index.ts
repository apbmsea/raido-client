import { actions, reducer, name } from './model/confirmSlice';

export { default as ConfirmForm } from './ui/ConfirmForm';
export { default as WatchConfirm } from './model/confirmSaga';

export const Confirm = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
