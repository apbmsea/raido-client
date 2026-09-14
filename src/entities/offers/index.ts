import { actions, reducer, name } from './model/offersSlice';
export { default as WatchOffers } from './model/offersSaga';

export const Offers = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
