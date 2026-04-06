export { default as PaginationComponent } from './ui/Pagination';
import { actions, reducer, name } from './model/paginationSlice';

export const Pagination = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
