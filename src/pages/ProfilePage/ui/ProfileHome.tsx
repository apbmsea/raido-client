import { useAppSelector } from '@shared/hooks/store.hooks';
import './ProfileHome.scss';

const ProfileHome = () => {
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
				раздел в меню.
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

export default ProfileHome;
