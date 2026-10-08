import { actions, reducer, name } from './model/userSlice';

export { default as watchUser } from './model/userSaga';
export {
	editUser,
	requestPasswordChange,
	requestTwoFactorSwitch
} from './api/userApi';
export type {
	ChangePasswordPayload,
	EditUserPayload,
	UserType
} from './model/userTypes';

export const User = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
