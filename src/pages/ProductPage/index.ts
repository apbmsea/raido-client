export { default as ProductPage } from './ui/ProductPage';
export { default as watchProduct } from './model/productSaga';
import { actions, reducer, name } from './model/productSlice';

export const Product = {
    reducer: {
        [name]: reducer
    },
    actions,
    name
};
