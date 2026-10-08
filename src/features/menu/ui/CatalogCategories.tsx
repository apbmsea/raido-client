import { Fragment } from 'react';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Loader } from '@shared/ui/Loader';
import { SvgIcon } from '@shared/ui/SvgIcon';
import { selectActiveCategory } from '../model/menuSelectors';
import { actions } from '../model/menuSlice';
import './CatalogCategories.scss';

// Последние категории каталога — сервисные, их отделяет черта
const SERVICE_CATEGORIES_COUNT = 4;

type CatalogCategoriesProps = {
	/** Подсвечивать открытую категорию: нужно там, где подкатегории видны рядом */
	highlightActive?: boolean;
};

const CatalogCategories = ({ highlightActive }: CatalogCategoriesProps) => {
	const { categories, isLoading } = useAppSelector(state => state.categories);
	const activeCategory = useAppSelector(selectActiveCategory);
	const dispatch = useAppDispatch();

	if (isLoading && categories.length === 0) return <Loader />;

	return (
		<div className='catalog-categories'>
			{categories.map((category, index) => (
				<Fragment key={category.id}>
					{index === categories.length - SERVICE_CATEGORIES_COUNT && (
						<div className='catalog-categories__divider' />
					)}

					<button
						type='button'
						className={clsx(
							'catalog-categories__category',
							highlightActive &&
								category.id === activeCategory?.id &&
								'catalog-categories__category--active'
						)}
						onClick={() => dispatch(actions.selectCategory(category.id))}
						onMouseEnter={() =>
							highlightActive &&
							dispatch(actions.selectCategory(category.id))
						}
					>
						<SvgIcon
							className='catalog-categories__icon'
							url={category.svg_icon}
						/>
						<span className='catalog-categories__title'>
							{category.name}
						</span>
					</button>
				</Fragment>
			))}
		</div>
	);
};

export default CatalogCategories;
