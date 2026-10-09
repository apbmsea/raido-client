import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { PROFILE_NAVIGATION } from '@shared/constants/profileNavbar';
import { useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import './ProfileNavbar.scss';

const ProfileNavbar = ({ className }: { className?: string }) => {
	const isCorporate = useAppSelector(
		state => state.user.user?.is_corporate ?? false
	);

	const navigationItems = PROFILE_NAVIGATION.filter(
		item => item.isCorporate === undefined || item.isCorporate === isCorporate
	);

	return (
		<aside className={clsx('profile-navbar', className)}>
			<nav className='profile-navbar__nav' aria-label='Разделы профиля'>
				{navigationItems.map(({ path, label, icon: Icon }) => (
					<NavLink
						key={path}
						to={path}
						className={({ isActive }) =>
							clsx(
								'profile-navbar__link',
								isActive && 'profile-navbar__link--active'
							)
						}
					>
						<Icon />
						<span>{label}</span>
					</NavLink>
				))}
			</nav>

			<div className='profile-navbar__promo'>
				<img
					className='profile-navbar__promo-image'
					src='/distribution.png'
					alt=''
					width={260}
					height={125}
					loading='lazy'
				/>
				<h3 className='profile-navbar__promo-title'>
					Подпишитесь на рассылку
				</h3>
				<p className='profile-navbar__promo-text'>
					Будьте в курсе всех выгодных предложений и новостей
				</p>
				<Button variant='outline'>Подписаться</Button>
			</div>
		</aside>
	);
};

export default ProfileNavbar;
