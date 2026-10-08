import { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	Catalog,
	SORT_OPTIONS,
	type CatalogView,
	type SortType
} from '@entities/catalog';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useClickOutside } from '@shared/hooks/useClickOutside.hook';
import ArrowDownIcon from '@shared/icons/ArrowDown';
import GridViewIcon from '@shared/icons/GridView';
import ListViewIcon from '@shared/icons/ListView';
import { Button } from '@shared/ui/Button';
import { IconButton } from '@shared/ui/IconButton';
import './Toolbar.scss';

type ToolbarProps = {
	onOpenFilters: () => void;
};

const Toolbar = ({ onOpenFilters }: ToolbarProps) => {
	const dispatch = useAppDispatch();
	const { sort, view } = useAppSelector(state => state.catalog);
	const activeFiltersCount = useAppSelector(
		state => state.filters.selectedProducers.length
	);

	const [isSortOpen, setIsSortOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	const closeSort = useCallback(() => setIsSortOpen(false), []);
	useClickOutside(selectRef, closeSort, isSortOpen);

	const handleSortChange = (value: SortType) => {
		if (value !== sort) dispatch(Catalog.actions.setSort(value));
		setIsSortOpen(false);
	};

	const handleViewChange = (nextView: CatalogView) => {
		if (nextView !== view) dispatch(Catalog.actions.setView(nextView));
	};

	const selectedSort = SORT_OPTIONS.find(option => option.value === sort);

	return (
		<section className='toolbar'>
			<Button
				className='toolbar__filters'
				variant='outline'
				onClick={onOpenFilters}
			>
				Фильтры
				{activeFiltersCount > 0 && ` · ${activeFiltersCount}`}
			</Button>

			<div
				ref={selectRef}
				className={clsx(
					'toolbar__select',
					isSortOpen && 'toolbar__select--open'
				)}
			>
				<button
					type='button'
					className='toolbar__select-header'
					aria-haspopup='listbox'
					aria-expanded={isSortOpen}
					onClick={() => setIsSortOpen(prev => !prev)}
				>
					<span>{selectedSort?.label ?? 'Сортировка'}</span>
					<ArrowDownIcon size={16} className='toolbar__select-icon' />
				</button>

				<div className='toolbar__select-dropdown' role='listbox'>
					{SORT_OPTIONS.map(option => (
						<button
							type='button'
							role='option'
							aria-selected={sort === option.value}
							key={option.value}
							className={clsx(
								'toolbar__select-option',
								sort === option.value &&
									'toolbar__select-option--active'
							)}
							onClick={() => handleSortChange(option.value)}
						>
							{option.label}
						</button>
					))}
				</div>
			</div>

			<div className='toolbar__views'>
				<IconButton
					size='m'
					variant={view === 'list' ? 'primary' : 'outline'}
					icon={<ListViewIcon size={24} />}
					onClick={() => handleViewChange('list')}
					aria-label='Показать списком'
					aria-pressed={view === 'list'}
				/>
				<IconButton
					size='m'
					variant={view === 'grid' ? 'primary' : 'outline'}
					icon={<GridViewIcon size={24} />}
					onClick={() => handleViewChange('grid')}
					aria-label='Показать плиткой'
					aria-pressed={view === 'grid'}
				/>
			</div>
		</section>
	);
};

export default Toolbar;
