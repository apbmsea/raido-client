import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { CatalogCard } from '@entities/catalog';
import { useEffect } from 'react';
import { Favorite } from '..';
import './FavoriteList.scss';
import { Loader } from '@shared/ui/Loader';

const FavoriteList = () => {
	const { items, isLoading } = useAppSelector(
		state => state.favorite
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(Favorite.actions.getFavoriteRequest());
	}, [dispatch]);

	if (isLoading) return <Loader />;

	if (items.length === 0)
		return (
			<div className='favorite-null'>
				<img
					className='favorite-null__image'
					src='./favorite.png'
					alt=''
				/>
				<span className='favorite-null__text'>
					В избранном пока нет товаров
				</span>
			</div>
		);

	return (
		<section className={`favorite-list`}>
			{items.map(item => (
				<CatalogCard
					item={item.product}
					key={item.product_id}
					variant={'grid'}
				/>
			))}
		</section>
	);
};

export default FavoriteList;
