import { actions, reducer, name } from './model/managerSlice';

export { default as watchManager } from './model/managerSaga';
export { default as ManagerList } from './ui/ManagerList';
export { default as OrganizationList } from './ui/OrganizationList';
export {
	acceptManagerInvitation,
	addManager,
	getManagerInvitationDetails,
	removeManager
} from './api/managerApi';
export type {
	InvitationDetails,
	ManagerType,
	OrganizationType
} from './model/managerTypes';

export const Manager = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
