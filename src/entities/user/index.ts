import { actions, reducer, name } from './model/userSlice';
export const User = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
