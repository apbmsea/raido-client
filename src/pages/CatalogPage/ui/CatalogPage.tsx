import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { CatalogList } from '../features/catalogList';
import { Filters } from '../features/filters';
import { PaginationComponent } from '../features/pagination';
import './CatalogPage.scss';
import { useEffect } from 'react';
import { Catalog } from '..';

const CatalogPage = () => {
	const title = useAppSelector(state => state.catalog.title);
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(Catalog.actions.catalogRequest())
})

	return (
		<main className='catalog'>
			Каталог {'-->'} Категория товаров {'-->'} {title}
			<h1>{title}</h1>
			<div className='catalog__content'>
				<Filters />
				<section className='catalog__main'>
					<div
						style={{
							width: '100%',
							background: '#e2e2e2',
							padding: '15px',
							borderRadius: '15px'
						}}
					>
						Сортировка
					</div>
					<CatalogList />
					<PaginationComponent />
				</section>
			</div>
		</main>
	);
};

export default CatalogPage;
