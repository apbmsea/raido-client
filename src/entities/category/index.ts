import { actions, reducer, name } from './model/categoriesSlice';

export { default as watchCategories } from './model/categoriesSaga';
export type { Category, SubCategory } from './model/categoryTypes';

export const Categories = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
