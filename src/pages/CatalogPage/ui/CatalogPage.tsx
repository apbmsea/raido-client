import { useEffect, useRef, useState } from 'react';
import { Catalog } from '@entities/catalog';
import { FiltersPanel } from '@features/catalogFilters';
import { Pagination } from '@features/catalogPagination';
import { Toolbar } from '@features/catalogToolbar';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Breadcrumbs } from '@shared/ui/Breadcrumbs';
import { plural } from '@shared/utils/plural';
import { CatalogList } from '@widgets/CatalogList';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import './CatalogPage.scss';

const CatalogPage = () => {
	const dispatch = useAppDispatch();
	const { title, total, isLoading } = useAppSelector(state => state.catalog);
	usePageTitle(title);

	const currentPage = useAppSelector(state => state.pagination.currentPage);
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);

	const headerRef = useRef<HTMLDivElement>(null);
	const shownPageRef = useRef(currentPage);

	useEffect(() => {
		dispatch(Catalog.actions.catalogRequest());
	}, [dispatch]);

	// После перехода на другую страницу списка возвращаем к его началу
	useEffect(() => {
		if (shownPageRef.current === currentPage) return;

		shownPageRef.current = currentPage;
		headerRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}, [currentPage]);

	return (
		<main className='catalog-page'>
			<div className='catalog-page__header' ref={headerRef}>
				<Breadcrumbs
					items={[{ label: 'Главная', to: '/' }, { label: title }]}
				/>
				<div className='catalog-page__heading'>
					<h1 className='catalog-page__title'>{title}</h1>
					{!isLoading && total > 0 && (
						<span className='catalog-page__total'>
							{total}{' '}
							{plural(total, ['товар', 'товара', 'товаров'])}
						</span>
					)}
				</div>
			</div>

			<div className='catalog-page__content'>
				<FiltersPanel
					isOpen={isFiltersOpen}
					onClose={() => setIsFiltersOpen(false)}
				/>
				<div className='catalog-page__main'>
					<Toolbar onOpenFilters={() => setIsFiltersOpen(true)} />
					<CatalogList />
					<Pagination />
				</div>
			</div>
		</main>
	);
};

export default CatalogPage;
