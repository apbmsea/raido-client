import { actions, reducer, name } from './model/menuSlice';

export const Menu = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};

export { default as BurgerMenu } from './ui/Menu';
