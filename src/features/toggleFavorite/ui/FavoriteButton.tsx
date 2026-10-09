import clsx from 'clsx';
import {
	Favorite,
	selectFavoriteItemByProductId,
	selectIsFavoriteProductPending
} from '@entities/favorite';
import { confirmAction, Modal } from '@entities/modal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import FavoriteIcon from '@shared/icons/Favorite';
import { IconButton, type IconButtonSize } from '@shared/ui/IconButton';
import './FavoriteButton.scss';

type FavoriteButtonProps = {
	productId: number;
	size?: IconButtonSize;
	className?: string;
};

const FavoriteButton = ({
	productId,
	size = 'm',
	className
}: FavoriteButtonProps) => {
	const dispatch = useAppDispatch();
	const isLogin = useAppSelector(state => state.user.isLogin);
	const favoriteItem = useAppSelector(
		selectFavoriteItemByProductId(productId)
	);
	const isPending = useAppSelector(selectIsFavoriteProductPending(productId));
	const isFavorite = !!favoriteItem;

	const handleClick = () => {
		if (!isLogin) {
			dispatch(Modal.actions.openModal('login'));
			return;
		}

		dispatch(
			favoriteItem
				? confirmAction({
						title: 'Убрать из избранного?',
						text: 'Товар пропадёт из списка избранного.',
						confirmLabel: 'Убрать',
						skipKey: 'remove-favorite',
						action: Favorite.actions.removeFavoriteRequest({
							itemId: favoriteItem.id,
							productId
						})
					})
				: Favorite.actions.addFavoriteRequest({ productId })
		);
	};

	return (
		<IconButton
			className={clsx(
				'favorite-button',
				isFavorite && 'favorite-button--active',
				className
			)}
			onClick={handleClick}
			disabled={isPending}
			size={size}
			aria-pressed={isFavorite}
			aria-label={isFavorite ? 'Убрать из избранного' : 'В избранное'}
			icon={<FavoriteIcon className='favorite-button__icon' />}
		/>
	);
};

export default FavoriteButton;
