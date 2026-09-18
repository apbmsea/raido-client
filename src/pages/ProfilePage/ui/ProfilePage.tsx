import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import './ProfilePage.scss';
import { ProfileNavbar } from '@widgets/ProfileNavbar';
import { IconButton } from '@shared/ui/IconButton';
import ArrowLeftIcon from '@shared/icons/ArrowLeft';

export const ProfilePage = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const isProfileRoot = pathname.endsWith('/profile');

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
