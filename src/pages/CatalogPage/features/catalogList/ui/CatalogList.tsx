import { useAppSelector } from '@shared/hooks/store.hooks';
import { CatalogCard } from '@entities/catalog';
import './CatalogList.scss';

const CatalogList = () => {
	const { items, view } = useAppSelector(state => state.catalog);

	if (items.length === 0) return (<div>Товаров не найденно, попробуйте изменить фильтры.</div>)

	return (
		<section className={`catalog-list view-${view}`}>
			{items.map(item => (
				<CatalogCard item={item} key={item.id} variant={view} />
			))}
		</section>
	);
};

export default CatalogList;
