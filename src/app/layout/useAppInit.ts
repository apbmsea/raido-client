import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Categories } from '@entities/category';
import { User } from '@entities/user';
import { Menu } from '@features/menu';
import { getToken } from '@shared/api/token';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { setNavigate } from '@shared/utils/navigate';

/** Стартовая загрузка данных и связь роутера с остальным приложением */
export const useAppInit = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	// Саги не видят роутер напрямую — отдаём им его навигацию
	useEffect(() => {
		setNavigate(navigate);
	}, [navigate]);

	useEffect(() => {
		dispatch(Categories.actions.getCategoriesRequest());

		// Без токена запрашивать профиль незачем: сразу считаем пользователя гостем
		dispatch(
			getToken()
				? User.actions.getUserRequest()
				: User.actions.getUserFailure()
		);
	}, [dispatch]);

	// Переход на другую страницу закрывает открытое меню
	useEffect(() => {
		dispatch(Menu.actions.close());
	}, [pathname, dispatch]);
};
