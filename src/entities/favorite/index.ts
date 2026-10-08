import { actions, reducer, name } from './model/favoriteSlice';

export { default as watchFavorite } from './model/favoriteSaga';
export {
	selectFavoriteItemByProductId,
	selectIsFavoriteProductPending
} from './model/favoriteSelectors';
export type { FavoriteItem } from './model/favoriteTypes';

export const Favorite = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
