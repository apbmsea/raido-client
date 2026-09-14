import { Catalog } from '@pages/CatalogPage';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { IconButton } from '@shared/ui/IconButton';
import { useEffect, useRef, useState } from 'react';
import './Toolbar.scss';
import ListViewIcon from '@shared/icons/ListView';
import GridViewIcon from '@shared/icons/GridView';
import ArrowDownIcon from '@shared/icons/ArrowDown';

const sortOptions = [
	{ label: 'По убыванию цены', value: 'retail_price_desc' },
	{ label: 'По возрастанию цены', value: 'retail_price_asc' },
	{ label: 'По названию', value: 'name_asc' }
];

const Toolbar = () => {
	const dispatch = useAppDispatch();
	const { sort, view } = useAppSelector(state => state.catalog);

	const [open, setOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	const handleChange = (value: string) => {
		dispatch(Catalog.actions.setSort(value as any));
		setOpen(false);
	};

	const handleViewChange = (view: 'grid' | 'list') => {
		dispatch(Catalog.actions.setView(view));
		localStorage.setItem('catalog-view', view);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, []);

	const selected = sortOptions.find(o => o.value === sort);

	return (
		<section className='toolbar'>
			<div
				ref={selectRef}
				className={`toolbar__select ${open ? 'toolbar__select--open' : ''}`}
			>
				<div
					className='toolbar__select-header'
					onClick={() => setOpen(prev => !prev)}
				>
					<span className='toolbar__select-value'>
						{selected?.label || 'Сортировка'}
					</span>

					<ArrowDownIcon
						size={16}
						className={`toolbar__select-icon ${
							open ? 'toolbar__select-icon--rotated' : ''
						}`}
					/>
				</div>

				<div className='toolbar__select-dropdown'>
					{sortOptions.map(option => (
						<div
							key={option.value}
							className={`toolbar__select-option ${
								sort === option.value
									? 'toolbar__select-option--active'
									: ''
							}`}
							onClick={() => handleChange(option.value)}
						>
							{option.label}
						</div>
					))}
				</div>
			</div>
			<div className='toolbar__buttons'>
				<IconButton
					size={45}
					variant={view === 'list' ? 'primary' : 'outline'}
					icon={<ListViewIcon size={24} />}
					onClick={() => handleViewChange('list')}
				/>
				<IconButton
					size={45}
					variant={view === 'grid' ? 'primary' : 'outline'}
					icon={<GridViewIcon size={24} />}
					onClick={() => handleViewChange('grid')}
				/>
			</div>
		</section>
	);
};

export default Toolbar;
