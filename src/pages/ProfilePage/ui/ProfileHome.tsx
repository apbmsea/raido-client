import { Link } from 'react-router-dom';
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
					<Link to='/profile/orders'>
						<strong>Мои заказы</strong>
						<span>История заказов и их текущий статус.</span>
					</Link>
				</li>
				<li>
					<Link to='/profile/options'>
						<strong>Настройки профиля</strong>
						<span>Контактные данные и информация аккаунта.</span>
					</Link>
				</li>
				{user?.is_corporate ? (
					<li>
						<Link to='/profile/managers'>
							<strong>Менеджеры</strong>
							<span>
								Управление доступом сотрудников организации.
							</span>
						</Link>
					</li>
				) : (
					<li>
						<Link to='/profile/organizations'>
							<strong>Организации</strong>
							<span>
								Организации, в которых вы назначены менеджером.
							</span>
						</Link>
					</li>
				)}
			</ul>
		</section>
	);
};

export default ProfileHome;
