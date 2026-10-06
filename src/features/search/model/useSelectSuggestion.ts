import { useAppDispatch } from '@shared/hooks/store.hooks';
import { useNavigate } from 'react-router-dom';
import { Catalog } from '@pages/CatalogPage';
import { actions, type SearchSuggestion } from './searchSlice';

export const useSelectSuggestion = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return (suggestion: SearchSuggestion) => {
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

		dispatch(actions.searchRequest(''));
	};
};
