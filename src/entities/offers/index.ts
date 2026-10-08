import { actions, reducer, name } from './model/offersSlice';

export { default as watchOffers } from './model/offersSaga';

export const Offers = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
