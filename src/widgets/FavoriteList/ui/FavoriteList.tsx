import { Link } from 'react-router-dom';
import { Favorite } from '@entities/favorite';
import { ProductCard } from '@entities/product';
import { AddToCartButton } from '@features/addToCart';
import { FavoriteButton } from '@features/toggleFavorite';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { EmptyState } from '@shared/ui/EmptyState';
import { LoadMore } from '@shared/ui/LoadMore';
import { Loader } from '@shared/ui/Loader';
import './FavoriteList.scss';

const FavoriteList = () => {
	const dispatch = useAppDispatch();
	const { items, isLoading, paging } = useAppSelector(
		state => state.favorite
	);

	if (isLoading && items.length === 0) return <Loader />;

	if (items.length === 0) {
		return (
			<EmptyState
				image='/favorite.png'
				title='В избранном пока нет товаров'
				action={
					<Link className='favorite-list__link' to='/'>
						Перейти к покупкам
					</Link>
				}
			/>
		);
	}

	return (
		<section className='favorite-list'>
			{items.map(item => (
				<ProductCard
					item={item.product}
					key={item.product_id}
					variant='grid'
					cartAction={<AddToCartButton productId={item.product_id} />}
					favoriteAction={
						<FavoriteButton productId={item.product_id} />
					}
				/>
			))}

			<LoadMore
				paging={paging}
				onLoadMore={() =>
					dispatch(Favorite.actions.getFavoriteMoreRequest())
				}
			/>
		</section>
	);
};

export default FavoriteList;
