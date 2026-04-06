import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@shared/hooks/store.hooks';
import './CatalogSubcategories.scss';
import { IconButton } from '@shared/ui/IconButton';
import CloseIcon from '@shared/icons/Close';
import { CatalogMenu } from '@features/catalogMenu';
import { Catalog } from '@pages/CatalogPage';
import { useNavigate } from 'react-router-dom';

const CatalogSubcategories = () => {
	const { categoryId } = useAppSelector(state => state.menu);
	const { categories } = useAppSelector(state => state.сategories);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const category = useMemo(
		() => categories.find(c => c.id === categoryId),
		[categories, categoryId]
	);

	const groups = useMemo(() => {
		if (!category) return [];

		const map = new Map<string, typeof category.subcategories>();

		category.subcategories.forEach(sub => {
			const title = sub.title ?? category.name;
			if (!map.has(title)) map.set(title, []);
			map.get(title)!.push(sub);
		});

		return Array.from(map.entries()).map(([title, items]) => ({
			title,
			items
		}));
	}, [category]);

	if (!category) return null;

	return (
		<div className='catalog-subcategories'>
			{groups.map(group => {
				const isOneColumn = group.items.length < 6;

				return (
					<div
						key={group.title}
						className='catalog-subcategories__group'
					>
						<h3 className='catalog-subcategories__group-title'>
							{group.title}
						</h3>

						<div
							className={`catalog-subcategories__items ${
								isOneColumn ? 'one-column' : 'adaptive'
							}`}
						>
							{group.items.map(sub => (
								<div
									key={sub.id}
									className='catalog-subcategories__item'
									onClick={() => {
										dispatch(
											Catalog.actions.setSubcategoryId(
												sub.id
											)
										);
										dispatch(
											CatalogMenu.actions.setIsOpen(false)
										);
										dispatch(
											Catalog.actions.catalogRequest()
										);
										dispatch(
											Catalog.actions.setTitle(sub.name || "Товары")
										);
										navigate('/catalog');
									}}
								>
									{sub.name}
								</div>
							))}
						</div>
					</div>
				);
			})}
			<IconButton
				onClick={() => dispatch(CatalogMenu.actions.setIsOpen(false))}
				title='Меню'
				className='catalog-subcategories__close hidden-tablet'
				size={45}
				icon={<CloseIcon />}
			/>
		</div>
	);
};

export default CatalogSubcategories;
