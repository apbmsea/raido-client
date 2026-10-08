import { useMemo } from 'react';
import clsx from 'clsx';
import { Catalog, useOpenCatalogPage } from '@entities/catalog';
import type { SubCategory } from '@entities/category';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { selectActiveCategory } from '../model/menuSelectors';
import { actions } from '../model/menuSlice';
import './CatalogSubcategories.scss';

// Короткие группы показываем столбиком, длинные раскладываем по колонкам
const MAX_ONE_COLUMN_ITEMS = 5;

const CatalogSubcategories = () => {
	const category = useAppSelector(selectActiveCategory);
	const dispatch = useAppDispatch();
	const openCatalogPage = useOpenCatalogPage();

	const groups = useMemo(() => {
		if (!category) return [];

		const map = new Map<string, SubCategory[]>();

		category.subcategories.forEach(sub => {
			const title = sub.title ?? '';
			map.set(title, [...(map.get(title) ?? []), sub]);
		});

		return Array.from(map, ([title, items]) => ({ title, items }));
	}, [category]);

	if (!category) return null;

	const openCatalog = () => {
		dispatch(actions.close());
		openCatalogPage();
	};

	return (
		<div className='catalog-subcategories'>
			<button
				type='button'
				className='catalog-subcategories__category'
				onClick={() => {
					dispatch(Catalog.actions.navigateToCategory({ id: category.id }));
					openCatalog();
				}}
			>
				{category.name}
			</button>

			{groups.map(group => (
				<div key={group.title} className='catalog-subcategories__group'>
					{group.title && (
						<h3 className='catalog-subcategories__group-title'>
							{group.title}
						</h3>
					)}

					<div
						className={clsx(
							'catalog-subcategories__items',
							group.items.length > MAX_ONE_COLUMN_ITEMS &&
								'catalog-subcategories__items--columns'
						)}
					>
						{group.items.map(sub => (
							<button
								type='button'
								key={sub.id}
								className='catalog-subcategories__item'
								onClick={() => {
									dispatch(
										Catalog.actions.navigateToSubcategory({
											id: sub.id
										})
									);
									openCatalog();
								}}
							>
								{sub.name}
							</button>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default CatalogSubcategories;
