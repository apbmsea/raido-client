import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import './CatalogCategories.scss';
import React from 'react';
import { Menu } from '@features/menu';
import { SvgIcon } from '@features/svgIcon';

const MobileCatalog = () => {
	const { categories, isLoading } = useAppSelector(state => state.сategories);
	const dispatch = useAppDispatch();

	return (
		<div className='catalog-categories'>
			{categories.map((category, index) => {
				const isDivider = index === categories.length - 4;

				return (
					<React.Fragment key={category.id}>
						{isDivider && (
							<div className='catalog-categories__divider' />
						)}

						<div
							className='catalog-categories__category'
							onClick={() => {
								dispatch(Menu.actions.setType('subcategory'));
								dispatch(
									Menu.actions.setCategoryId(category.id)
								);
							}}
							onMouseEnter={() => {
								dispatch(Menu.actions.setType('subcategory'));
								dispatch(
									Menu.actions.setCategoryId(category.id)
								);
							}}
						>
							<SvgIcon
								className='catalog-categories__category-image'
								width={28}
								height={28}
								url={category.svg_icon}
							/>
							<span className='catalog-categories__category-title'>
								{category.name}
							</span>
						</div>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default MobileCatalog;
