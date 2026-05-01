import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { CatalogList } from '../features/catalogList';
import { Filters } from '../features/filters';
import { PaginationComponent } from '../features/pagination';
import './CatalogPage.scss';
import { useEffect } from 'react';
import { Catalog } from '..';
import { Toolbar } from '../features/Toolbar';

const CatalogPage = () => {
	const { title } = useAppSelector(state => state.catalog);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(Catalog.actions.catalogRequest());
	}, []);

	return (
		<main className='catalog'>
			<span className='catalog__path'>
				Каталог {'-->'} Категория товаров {'-->'} {title}
			</span>
			<h1 className='catalog__title'>{title}</h1>
			<div className='catalog__content'>
				<Filters />
				<section className='catalog__main'>
					<Toolbar />
					<CatalogList />
					<PaginationComponent />
				</section>
			</div>
		</main>
	);
};

export default CatalogPage;
