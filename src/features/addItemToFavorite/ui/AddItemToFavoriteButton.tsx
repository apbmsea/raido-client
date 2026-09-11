import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import FavoriteIcon from '@shared/icons/Favorite';
import { IconButton } from '@shared/ui/IconButton';
import './AddItemToFavorite.scss';
import { Favorite } from '@entities/favorite';

type AddItemToFavoriteProps = {
	productId: number;
};

const AddItemToFavorite = ({ productId }: AddItemToFavoriteProps) => {
	const favoriteItem = useAppSelector(state =>
		state.favorite.items.find(item => item.product_id === productId)
	);
	const dispatch = useAppDispatch();

	console.log('favoriteItem', favoriteItem);

	return (
		<IconButton className='favorite-button'
			onClick={() => {
				if (favoriteItem) {
					dispatch(
						Favorite.actions.removeFavoriteRequest({
							productId: favoriteItem.id
						})
					);
				} else {
					dispatch(
						Favorite.actions.addFavoriteRequest({
							productId: productId
						})
					);
				}
			}}
			size={45}
			icon={
				<FavoriteIcon
					className={`favorite-button__icon ${favoriteItem ? 'favorite-button__icon--active' : ''}`}
				/>
			}
		/>
	);
};

export default AddItemToFavorite;
