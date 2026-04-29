import { useAppSelector } from '@shared/hooks/store.hooks';
import { CatalogCard } from '@entities/catalog';
import './CatalogList.scss';

const CatalogList = () => {
	const items = useAppSelector(state => state.catalog.items);

	return (
		<section className='catalog-list'>
			{items.map(item => (
				<CatalogCard item={item} key={item.id} />
			))}
		</section>
	);
};

export default CatalogList;
