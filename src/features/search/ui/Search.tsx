import { SvgIcon } from '@features/svgIcon';
import { useAppSelector } from '@shared/hooks/store.hooks';
import './Search.scss';
import { useSelectSuggestion } from '../model/useSelectSuggestion';

interface SearchComponentProps {
	activeIndex: number;
	onActiveChange: (index: number) => void;
}

const SearchComponent = ({
	activeIndex,
	onActiveChange
}: SearchComponentProps) => {
	const selectSuggestion = useSelectSuggestion();
	const { items, search } = useAppSelector(state => state.search);

	if (search === '') {
		return null;
	}

	return (
		<div className='search' onMouseLeave={() => onActiveChange(-1)}>
			{items.length > 0 ? (
				items.map((suggestion, index) => (
					<div
						className={`search__suggestion ${
							index === activeIndex
								? 'search__suggestion--active'
								: ''
						}`}
						key={`${suggestion.type}-${suggestion.id}`}
						role='button'
						onMouseEnter={() => onActiveChange(index)}
						onClick={() => selectSuggestion(suggestion)}
					>
						<div className='search__icon-wrapper'>
							<SvgIcon
								className='search__icon'
								width={24}
								height={24}
								url={suggestion.svg_icon}
							/>
						</div>
						<div className='search__content'>
							{suggestion.type === 'subcategory' && (
								<span className='search__top-category'>
									{suggestion.top_category_title}
								</span>
							)}
							<h2 className='search__title'>
								{suggestion.title}
							</h2>
						</div>
					</div>
				))
			) : (
				<div className='search__empty'>
					По вашему запросу ничего не найдено
				</div>
			)}
		</div>
	);
};

export default SearchComponent;
