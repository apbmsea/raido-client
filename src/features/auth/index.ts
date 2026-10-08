import * as login from './model/loginSlice';
import * as register from './model/registerSlice';
import * as confirm from './model/confirmSlice';

export { default as watchAuth } from './model/authSaga';
export { default as LoginForm } from './ui/LoginForm';
export { default as RegisterForm } from './ui/RegisterForm';
export { default as ConfirmForm } from './ui/ConfirmForm';
export { default as ConfirmSuccessWindow } from './ui/ConfirmSuccessWindow';
export { AuthPrompt } from './ui/AuthPrompt';
export { LogoutButton } from './ui/LogoutButton';
export { SecuritySettings } from './ui/SecuritySettings';
export type { ConfirmType } from './model/authTypes';

export const Login = {
	reducer: {
		[login.name]: login.reducer
	},
	actions: login.actions,
	name: login.name
};

export const Register = {
	reducer: {
		[register.name]: register.reducer
	},
	actions: register.actions,
	name: register.name
};

export const Confirm = {
	reducer: {
		[confirm.name]: confirm.reducer
	},
	actions: confirm.actions,
	name: confirm.name
};
