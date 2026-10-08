import { useEffect } from 'react';
import { Favorite } from '@entities/favorite';
import { AuthPrompt } from '@features/auth';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Loader } from '@shared/ui/Loader';
import { FavoriteList } from '@widgets/FavoriteList';
import { OffersWidget } from '@widgets/OffersWidget';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import './FavoritePage.scss';

const FavoritePage = () => {
	usePageTitle('Избранное');

	const dispatch = useAppDispatch();
	const { isLogin, isLoading } = useAppSelector(state => state.user);

	useEffect(() => {
		if (isLogin) dispatch(Favorite.actions.getFavoriteRequest());
	}, [isLogin, dispatch]);

	return (
		<main className='favorite-page'>
			<h1 className='favorite-page__title'>Избранное</h1>

			{isLoading ? (
				<Loader />
			) : isLogin ? (
				<FavoriteList />
			) : (
				<AuthPrompt message='Войдите в профиль, чтобы сохранять товары в избранное' />
			)}

			<OffersWidget />
		</main>
	);
};

export default FavoritePage;
