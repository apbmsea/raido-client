import { actions, reducer, name } from './model/loginSlice';

export { default as LoginForm } from './ui/LoginForm';
export { default as WatchLogin } from './model/loginSaga';

export const Login = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
