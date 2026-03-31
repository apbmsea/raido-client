import { useEffect } from 'react';
import { Catalog } from '@pages/CatalogPage';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { CatalogCard } from '@entities/catalog';
import './CatalogList.scss'

const CatalogList = () => {
	const dispatch = useAppDispatch();
	const items = useAppSelector(state => state.catalog.items);
	useEffect(() => {
		dispatch(Catalog.actions.catalogRequest());
	}, []);
	return (
		<section className='catalog-list'>
			{items.map(item => (
				<CatalogCard item={item} key={item.id} />
			))}
		</section>
	);
};

export default CatalogList;
