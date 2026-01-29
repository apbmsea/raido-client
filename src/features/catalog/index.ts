export { default as CatalogMenu } from './ui/CatalogMenu';
import { actions, reducer, name } from './model/catalogSlice';

export const Catalog = {
    reducer: {
        [name]: reducer
    },
    actions,
    name
};