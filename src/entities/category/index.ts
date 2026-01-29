import { actions, reducer, name } from './model/categoriesSlice';

export const Categories = {
    reducer: {
        [name]: reducer
    },
    actions,
    name
};

export { default as watchCategories } from './model/categoriesSaga'