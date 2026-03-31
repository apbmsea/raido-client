export { default as CatalogMenuModal } from './ui/CatalogMenu';
import { actions, reducer, name } from './model/catalogMenuSlice';

export const CatalogMenu = {
    reducer: {
        [name]: reducer
    },
    actions,
    name
};