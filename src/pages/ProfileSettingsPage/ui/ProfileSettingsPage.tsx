import { LogoutButton, SecuritySettings } from '@features/auth';
import { EditUserForm } from '@features/editUser';
import { useAppSelector } from '@shared/hooks/store.hooks';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import './ProfileSettingsPage.scss';

const ProfileSettingsPage = () => {
	usePageTitle('Настройки профиля');

	const user = useAppSelector(state => state.user.user);

	if (!user) return null;

	return (
		<div className='profile-settings-page'>
			<EditUserForm user={user} />
			<SecuritySettings email={user.email} />
			<div>
				<LogoutButton />
			</div>
		</div>
	);
};

export default ProfileSettingsPage;
