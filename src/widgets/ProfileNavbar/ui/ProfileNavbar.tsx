import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { User } from '@entities/user';
import { PROFILE_NAVIGATION } from '@shared/constants/profileNavbar';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { AppImage } from '@shared/ui/AppImage';
import { Button } from '@shared/ui/Button';
import './ProfileNavbar.scss';

const ProfileNavbar = ({ className }: { className?: string }) => {
	const dispatch = useAppDispatch();
	const isCorporate = useAppSelector(
		state => state.user.user?.is_corporate ?? false
	);
	const isSubscribed = useAppSelector(
		state => state.user.user?.marketing_email_consent ?? false
	);
	const isMarketingConsentFetch = useAppSelector(
		state => state.user.isMarketingConsentFetch
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
				<AppImage
					className='profile-navbar__promo-image'
					src='/distribution.png'
					alt=''
					width={260}
					height={125}
					loading='lazy'
				/>
				<h3 className='profile-navbar__promo-title'>
					{isSubscribed
						? 'Вы подписаны на рассылку'
						: 'Подпишитесь на рассылку'}
				</h3>
				<p className='profile-navbar__promo-text'>
					{isSubscribed
						? 'Вы получаете все выгодные предложения и новости'
						: 'Будьте в курсе всех выгодных предложений и новостей'}
				</p>
				<Button
					variant='outline'
					loading={isMarketingConsentFetch}
					onClick={() =>
						dispatch(
							User.actions.setMarketingConsentRequest(!isSubscribed)
						)
					}
				>
					{isSubscribed ? 'Отписаться' : 'Подписаться'}
				</Button>
			</div>
		</aside>
	);
};

export default ProfileNavbar;
