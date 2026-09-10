import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { CatalogCard } from '@entities/catalog';
import { useEffect } from 'react';
import { Favorite } from '..';
// import './FavoriteList.scss';

const FavoriteList = () => {
	const { items, isLoading, isFetch } = useAppSelector(
		state => state.favorite
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(Favorite.actions.getFavoriteRequest());
	}, [dispatch]);

	if (items.length === 0) return <div>sds</div>;

	return (
		<section className={`favorite-list view-list`}>
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
