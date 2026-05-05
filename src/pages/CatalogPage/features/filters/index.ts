export { default as FiltersComponent } from './ui/Filters';
import { actions, reducer, name } from './model/filtersSlice';

export const Filters = {
    reducer: {
        [name]: reducer
    },
    actions,
    name
};
