import {
	Outlet,
	useLocation,
	useNavigate,
	useSearchParams
} from 'react-router-dom';
import { useEffect } from 'react';

import './ProfilePage.scss';
import { ProfileNavbar } from '@widgets/ProfileNavbar';
import { IconButton } from '@shared/ui/IconButton';
import ArrowLeftIcon from '@shared/icons/ArrowLeft';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Modal } from '@entities/modal';
import { UnauthWidget } from '@widgets/UnauthWidget';

export const ProfileHome = () => {
	const user = useAppSelector(state => state.user.user);
	const name = [user?.name, user?.surname].filter(Boolean).join(' ');
	const welcomeName = name || user?.email || 'пользователь';

	return (
		<section className='profile-home'>
			<p className='profile-home__eyebrow'>ЛИЧНЫЙ КАБИНЕТ</p>
			<h1 className='profile-home__title'>
				Добро пожаловать, {welcomeName}!
			</h1>
			<p className='profile-home__description'>
				Здесь собраны ваши заказы и настройки аккаунта. Выберите подходящий
				раздел в меню слева.
			</p>
			<ul className='profile-home__sections'>
				<li>
					<strong>Мои заказы</strong>
					<span>История заказов и их текущий статус.</span>
				</li>
				<li>
					<strong>Настройки профиля</strong>
					<span>Контактные данные и информация аккаунта.</span>
				</li>
				{user?.is_corporate ? (
					<li>
						<strong>Менеджеры</strong>
						<span>Управление доступом сотрудников организации.</span>
					</li>
				) : (
					<li>
						<strong>Организации</strong>
						<span>Организации, в которых вы назначены менеджером.</span>
					</li>
				)}
			</ul>
		</section>
	);
};

export const ProfilePage = () => {
	const dispatch = useAppDispatch();
	const { isLogin, isLoading } = useAppSelector(state => state.user);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const [searchParams] = useSearchParams();
	const isProfileRoot = pathname.endsWith('/profile');
	const isManagerInvitation = searchParams.has('invitation_token');

	useEffect(() => {
		if (!isLoading && !isLogin && !isManagerInvitation) {
			dispatch(Modal.actions.openModal('login'));
		}
	}, [dispatch, isLoading, isLogin, isManagerInvitation]);

	if (isManagerInvitation) {
		return <Outlet />;
	}

	if (isLoading) {
		return (
			<div className='profile-page profile-page--status'>
				<p>Проверяем авторизацию...</p>
			</div>
		);
	}

	if (!isLogin) {
		return (
			<div className='profile-page profile-page--status'>
				<h1 className='profile-page__auth-title'>Войдите в аккаунт</h1>
				<p className='profile-page__auth-description'>
					Чтобы открыть личный кабинет, войдите или создайте аккаунт.
				</p>
				<UnauthWidget message='Войдите, чтобы перейти к разделам профиля.' />
			</div>
		);
	}

	return (
		<div className='profile-page'>
			<h2 className='profile-page__title'>Профиль</h2>

			<div className='profile-page__tab'>
				{!isProfileRoot && (
					<IconButton
						onClick={() => navigate('/profile')}
						icon={<ArrowLeftIcon />}
					/>
				)}
				<h2 className='profile-page__tab-title'>Профиль</h2>
			</div>

			<div className='profile-page__content'>
				<ProfileNavbar />
				<div className='profile-page__outlet'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};
