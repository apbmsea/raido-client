import { NavLink, useLocation } from 'react-router-dom'; // Добавили useLocation
import { PROFILE_NAVIGATION } from '../../../shared/constants/profileNavbar';
import { useAppSelector } from '@shared/hooks/store.hooks';
import './ProfileNavbar.scss';
import { Button } from '@shared/ui/Button';

const ProfileNavbar = () => {
	const { pathname } = useLocation();

	const isCorporate = useAppSelector(
		state => state.user.user?.is_corporate ?? false
	);

	// Проверяем, заканчивается ли путь на /profile
	const isProfileRoot = pathname.endsWith('/profile');

	const navigationItems = PROFILE_NAVIGATION.filter(item => {
		if (item.isCorporate === undefined) {
			return true;
		}

		return item.isCorporate === isCorporate;
	});

	return (
		/* Добавляем класс модификатора, если условие верно */
		<aside
			className={`profile-navbar__sidebar ${isProfileRoot ? 'profile-navbar__sidebar--root' : ''}`.trim()}
		>
			<nav className='profile-navbar__navbar'>
				{navigationItems.map(item => {
					const Icon = item.icon;

					return (
						<NavLink
							key={item.path}
							to={item.path}
							className={({ isActive }) =>
								[
									'profile-navbar__link',
									isActive && 'profile-navbar__link--active'
								]
									.filter(Boolean)
									.join(' ')
							}
						>
							<Icon />

							<span>{item.label}</span>
						</NavLink>
					);
				})}
			</nav>
			<div className='profile-navbar__distribution'>
				<img
					className='profile-navbar__distribution-image'
					src='/distribution.png'
					alt='Рассылка'
				/>
				<div className='profile-navbar__info'>
					<div>
						<h3 className='profile-navbar__info-title'>
							Подпишитесь на рассылку
						</h3>
						<span className='profile-navbar__info-text'>
							Будте в курсе всех выгодных преложений и новостей
						</span>
					</div>
					<Button variant='outline'>Подписаться</Button>
				</div>
			</div>
		</aside>
	);
};

export default ProfileNavbar;
