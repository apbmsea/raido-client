import { User } from '@entities/user';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';

export const LogoutButton = () => {
	const dispatch = useAppDispatch();
	const isLoggingOut = useAppSelector(state => state.user.isLoggingOut);

	return (
		<Button
			onClick={() => dispatch(User.actions.logoutRequest())}
			variant='outline'
			loading={isLoggingOut}
		>
			Выйти
		</Button>
	);
};
