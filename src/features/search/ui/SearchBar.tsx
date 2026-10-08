import { useCallback, useRef, useState, type KeyboardEvent } from 'react';
import clsx from 'clsx';
import { Catalog, useOpenCatalogPage } from '@entities/catalog';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useClickOutside } from '@shared/hooks/useClickOutside.hook';
import SearchIcon from '@shared/icons/Search';
import { IconButton } from '@shared/ui/IconButton';
import { Input } from '@shared/ui/Input';
import { SvgIcon } from '@shared/ui/SvgIcon';
import { actions } from '../model/searchSlice';
import type { SearchSuggestion } from '../model/searchTypes';
import './SearchBar.scss';

const SearchBar = ({ className }: { className?: string }) => {
	const dispatch = useAppDispatch();
	const openCatalogPage = useOpenCatalogPage();
	const { items, query, isLoading } = useAppSelector(state => state.search);

	const rootRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	// Выделение привязано к списку, для которого сделано: с новыми
	// подсказками оно сбрасывается само
	const [active, setActive] = useState({ list: items, index: -1 });
	const activeIndex = active.list === items ? active.index : -1;
	const setActiveIndex = (index: number) => setActive({ list: items, index });

	const isDropdownVisible = isOpen && query.trim() !== '';

	const close = useCallback(() => setIsOpen(false), []);
	useClickOutside(rootRef, close, isDropdownVisible);

	const goToCatalog = () => {
		openCatalogPage();
		dispatch(actions.setQuery(''));
		setIsOpen(false);
	};

	const selectSuggestion = (suggestion: SearchSuggestion) => {
		dispatch(
			suggestion.type === 'category'
				? Catalog.actions.navigateToCategory({ id: suggestion.id })
				: Catalog.actions.navigateToSubcategory({ id: suggestion.id })
		);
		goToCatalog();
	};

	const searchProducts = () => {
		const search = query.trim();
		if (!search) return;

		dispatch(Catalog.actions.navigateToSearch(search));
		goToCatalog();
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			const suggestion = items[activeIndex];
			if (suggestion) {
				selectSuggestion(suggestion);
			} else {
				searchProducts();
			}
			return;
		}

		if (items.length === 0) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setIsOpen(true);
			setActiveIndex((activeIndex + 1) % items.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setActiveIndex(activeIndex <= 0 ? items.length - 1 : activeIndex - 1);
		}
	};

	return (
		<div className={clsx('search-bar', className)} ref={rootRef}>
			<Input
				type='search'
				placeholder='Поиск'
				aria-label='Поиск по каталогу'
				autoComplete='off'
				enterKeyHint='search'
				value={query}
				onChange={e => {
					dispatch(actions.setQuery(e.target.value));
					setIsOpen(true);
				}}
				onFocus={() => setIsOpen(true)}
				onKeyDown={handleKeyDown}
				button={
					<IconButton
						variant='primary'
						size='xs'
						icon={<SearchIcon size={18} />}
						onClick={searchProducts}
						aria-label='Найти'
					/>
				}
			/>

			{isDropdownVisible && (
				<div
					className='search-bar__dropdown'
					onMouseLeave={() => setActiveIndex(-1)}
				>
					{items.map((suggestion, index) => (
						<button
							type='button'
							className={clsx(
								'search-bar__suggestion',
								index === activeIndex &&
									'search-bar__suggestion--active'
							)}
							key={`${suggestion.type}-${suggestion.id}`}
							onMouseEnter={() => setActiveIndex(index)}
							onClick={() => selectSuggestion(suggestion)}
						>
							<span className='search-bar__icon-wrapper'>
								<SvgIcon url={suggestion.svg_icon} />
							</span>
							<span className='search-bar__content'>
								{suggestion.type === 'subcategory' &&
									suggestion.top_category_title && (
										<span className='search-bar__top-category'>
											{suggestion.top_category_title}
										</span>
									)}
								<span className='search-bar__title'>
									{suggestion.title}
								</span>
							</span>
						</button>
					))}

					{items.length === 0 && (
						<div className='search-bar__empty'>
							{isLoading
								? 'Ищем…'
								: 'Разделов не нашлось. Нажмите Enter, чтобы искать по товарам'}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
