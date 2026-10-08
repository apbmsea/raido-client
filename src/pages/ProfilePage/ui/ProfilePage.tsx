import { useEffect } from 'react';
import {
	Outlet,
	useLocation,
	useNavigate,
	useSearchParams
} from 'react-router-dom';
import clsx from 'clsx';
import { Modal } from '@entities/modal';
import { AuthPrompt } from '@features/auth';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import ArrowLeftIcon from '@shared/icons/ArrowLeft';
import { IconButton } from '@shared/ui/IconButton';
import { Loader } from '@shared/ui/Loader';
import { ProfileNavbar } from '@widgets/ProfileNavbar';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import './ProfilePage.scss';

/** Каркас личного кабинета: проверка входа, меню разделов и вложенная страница */
const ProfilePage = () => {
	const dispatch = useAppDispatch();
	const { isLogin, isLoading } = useAppSelector(state => state.user);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [searchParams] = useSearchParams();
	const isProfileRoot = /^\/profile\/?$/.test(pathname);
	// Приглашение менеджера открывается по ссылке из письма и доступно без входа
	const isManagerInvitation = searchParams.has('invitation_token');
	// Заголовок вкладки задаёт вложенная страница. Пока её нет на экране
	// (идёт проверка входа или гость не вошёл), ставим его сами
	usePageTitle(
		isManagerInvitation || (!isLoading && isLogin) ? null : 'Профиль'
	);

	useEffect(() => {
		if (!isLoading && !isLogin && !isManagerInvitation) {
			dispatch(Modal.actions.openModal('login'));
		}
	}, [dispatch, isLoading, isLogin, isManagerInvitation]);

	if (isManagerInvitation) {
		return (
			<main className='profile-page'>
				<Outlet />
			</main>
		);
	}

	if (isLoading) {
		return (
			<main className='profile-page'>
				<Loader text='Проверяем авторизацию' />
			</main>
		);
	}

	if (!isLogin) {
		return (
			<main className='profile-page'>
				<h1 className='profile-page__title'>Войдите в аккаунт</h1>
				<AuthPrompt message='Чтобы открыть личный кабинет, войдите или создайте аккаунт.' />
			</main>
		);
	}

	return (
		<main className='profile-page'>
			<div className='profile-page__heading'>
				{/* На узких экранах меню разделов скрыто — к нему ведёт кнопка «Назад» */}
				{!isProfileRoot && (
					<IconButton
						className='visible-tablet'
						size='s'
						onClick={() => navigate('/profile')}
						icon={<ArrowLeftIcon />}
						aria-label='К разделам профиля'
					/>
				)}
				<h2 className='profile-page__title'>Профиль</h2>
			</div>

			<div className='profile-page__content'>
				<ProfileNavbar
					className={clsx(!isProfileRoot && 'hidden-tablet')}
				/>
				<div className='profile-page__outlet'>
					<Outlet />
				</div>
			</div>
		</main>
	);
};

export default ProfilePage;
