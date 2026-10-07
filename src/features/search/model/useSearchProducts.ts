import { useAppDispatch } from '@shared/hooks/store.hooks';
import { useNavigate } from 'react-router-dom';
import { Catalog } from '@pages/CatalogPage';
import { actions } from './searchSlice';

export const useSearchProducts = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return (query: string) => {
		const search = query.trim();

		if (!search) return;

		navigate('/catalog');

		dispatch(Catalog.actions.navigateToSearch(search));
		dispatch(actions.searchRequest(''));
	};
};
