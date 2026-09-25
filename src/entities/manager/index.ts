import { actions, reducer, name } from './model/managerSlice';
export { default as ManagerList } from './ui/ManagerList';
export { default as WatchManager } from './model/managerSaga';

export const Manager = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
