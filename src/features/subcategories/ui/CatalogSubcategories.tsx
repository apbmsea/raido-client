import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@shared/hooks/store.hooks';
import './CatalogSubcategories.scss';
import { IconButton } from '@shared/ui/IconButton';
import CloseIcon from '@shared/icons/Close';
import { Menu } from '@features/menu';
import { Catalog } from '@features/catalog';

const CatalogSubcategories = () => {
	const { categoryId } = useAppSelector(state => state.menu);
	const { categories } = useAppSelector(state => state.сategories);
	const dispatch = useAppDispatch();

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
								>
									{sub.name}
								</div>
							))}
						</div>
					</div>
				);
			})}
			<IconButton
				onClick={() => dispatch(Catalog.actions.setIsOpen(false))}
				title='Меню'
				className='catalog-subcategories__close'
				size={45}
				icon={<CloseIcon />}
			/>
		</div>
	);
};

export default CatalogSubcategories;
