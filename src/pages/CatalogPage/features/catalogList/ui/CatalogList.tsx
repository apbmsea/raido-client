import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { CatalogCard } from '@entities/catalog';
import './CatalogList.scss';
import { useEffect } from 'react';
import { Catalog } from '@pages/CatalogPage';

const CatalogList = () => {
	const { items, view } = useAppSelector(state => state.catalog);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const savedView = localStorage.getItem('catalog-view');

		dispatch(Catalog.actions.setView(savedView as 'grid' | 'list'));
	}, []);

	if (items.length === 0)
		return <div>Товаров не найденно, попробуйте изменить фильтры.</div>;

	return (
		<section className={`catalog-list view-${view}`}>
			{items.map(item => (
				<CatalogCard item={item} key={item.id} variant={view} />
			))}
		</section>
	);
};

export default CatalogList;
