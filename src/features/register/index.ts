import { actions, reducer, name } from './model/registerSlice';

export { default as RegisterForm } from './ui/RegisterForm';
export { default as WatchRegister } from './model/registerSaga';
export const Register = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
