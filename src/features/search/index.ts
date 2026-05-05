import { actions, reducer, name } from './model/searchSlice';
export { default as WatchSearch } from './model/searchSaga';
export { default as SearchComponent } from './ui/Search';

export const Search = {
    reducer: {
        [name]: reducer
    },
    actions,
    name
};
