import { Link } from 'react-router-dom';
import { ProductCard } from '@entities/product';
import { AddToCartButton } from '@features/addToCart';
import { FavoriteButton } from '@features/toggleFavorite';
import { useAppSelector } from '@shared/hooks/store.hooks';
import { EmptyState } from '@shared/ui/EmptyState';
import { Loader } from '@shared/ui/Loader';
import './FavoriteList.scss';

const FavoriteList = () => {
	const { items, isLoading } = useAppSelector(state => state.favorite);

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
		</section>
	);
};

export default FavoriteList;
