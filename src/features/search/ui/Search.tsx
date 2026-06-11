import { SvgIcon } from '@features/svgIcon';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import './Search.scss';
import { Search } from '..';
import { useNavigate } from 'react-router-dom';
import { Catalog } from '@pages/CatalogPage';

const SearchComponent = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { items, search } = useAppSelector(state => state.search);

	if (search === '') {
		return null;
	}

	return (
		<div className='search'>
			{items.length > 0 ? (
				items.map(suggestion => (
					<div
						className='search__suggestion'
						key={`${suggestion.type}-${suggestion.id}`}
						role='button'
						onClick={() => {
							navigate('/catalog');

							suggestion.type === 'category'
								? dispatch(
										Catalog.actions.navigateToСategory({
											id: suggestion.id
										})
									)
								: dispatch(
										Catalog.actions.navigateToSubcategory({
											id: suggestion.id
										})
									);

							dispatch(Search.actions.searchRequest(''));
						}}
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
