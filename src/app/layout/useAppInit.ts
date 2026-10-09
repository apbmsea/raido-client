import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Categories } from '@entities/category';
import { User } from '@entities/user';
import { Menu } from '@features/menu';
import { getToken } from '@shared/api/token';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { setNavigate } from '@shared/utils/navigate';

export const useAppInit = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		setNavigate(navigate);
	}, [navigate]);

	useEffect(() => {
		dispatch(Categories.actions.getCategoriesRequest());

		dispatch(
			getToken()
				? User.actions.getUserRequest()
				: User.actions.getUserFailure()
		);
	}, [dispatch]);

	useEffect(() => {
		dispatch(Menu.actions.close());
	}, [pathname, dispatch]);
};
