import { useEffect, useRef, useState } from 'react';
import { Catalog } from '@entities/catalog';
import { selectCategoryBySubcategoryId } from '@entities/category';
import { FiltersPanel } from '@features/catalogFilters';
import { Pagination } from '@features/catalogPagination';
import { Toolbar } from '@features/catalogToolbar';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Breadcrumbs, type BreadcrumbItem } from '@shared/ui/Breadcrumbs';
import { plural } from '@shared/utils/plural';
import { CatalogList } from '@widgets/CatalogList';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import './CatalogPage.scss';

const CatalogPage = () => {
	const dispatch = useAppDispatch();
	const { title, total, isLoading, subcategoryId } = useAppSelector(
		state => state.catalog
	);
	const parentCategory = useAppSelector(
		selectCategoryBySubcategoryId(subcategoryId)
	);
	usePageTitle(title, {
		description: `${title} в интернет-магазине «Райдо Сервис»: цены, характеристики, наличие и отзывы покупателей.`,
		canonical: false
	});

	const currentPage = useAppSelector(state => state.pagination.currentPage);
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);

	const headerRef = useRef<HTMLDivElement>(null);
	const shownPageRef = useRef(currentPage);

	useEffect(() => {
		dispatch(Catalog.actions.catalogRequest());
	}, [dispatch]);

	useEffect(() => {
		if (shownPageRef.current === currentPage) return;

		shownPageRef.current = currentPage;
		headerRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}, [currentPage]);

	const breadcrumbs: BreadcrumbItem[] = [{ label: 'Главная', to: '/' }];

	if (parentCategory) {
		breadcrumbs.push({
			label: parentCategory.name,
			onClick: () =>
				dispatch(
					Catalog.actions.navigateToCategory({
						id: parentCategory.id
					})
				)
		});
	}

	breadcrumbs.push({ label: title });

	return (
		<main className='catalog-page'>
			<div className='catalog-page__header' ref={headerRef}>
				<Breadcrumbs items={breadcrumbs} />
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
