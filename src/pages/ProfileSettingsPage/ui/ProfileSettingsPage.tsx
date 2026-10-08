import { LogoutButton, SecuritySettings } from '@features/auth';
import { EditUserForm } from '@features/editUser';
import { useAppSelector } from '@shared/hooks/store.hooks';
import './ProfileSettingsPage.scss';

const ProfileSettingsPage = () => {
	const user = useAppSelector(state => state.user.user);

	// Раздел открывается только внутри ProfilePage, который уже проверил вход
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
