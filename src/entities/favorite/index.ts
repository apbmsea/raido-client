import { actions, reducer, name } from './model/favoriteSlice';
export { default as FavoriteList } from './ui/FavoriteList';
export { default as WatchFavorite } from './model/favoriteSaga';

export const Favorite = {
	reducer: {
		[name]: reducer
	},
	actions,
	name
};
