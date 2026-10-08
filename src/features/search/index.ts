import { actions, reducer, name } from './model/searchSlice';

export { default as watchSearch } from './model/searchSaga';
export { default as SearchBar } from './ui/SearchBar';

export const Search = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
