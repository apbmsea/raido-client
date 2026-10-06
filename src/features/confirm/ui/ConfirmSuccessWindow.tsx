import { Button } from '@shared/ui/Button';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Modal } from '@entities/modal';
import './ConfirmForm.scss';

const getTwoFactorContent = (isTwoFactorEnabled: null | boolean) => {
	if (isTwoFactorEnabled === null) {
		return {
			title: 'Настройка двухфакторной аутентификации изменена',
			text: 'Новый статус указан в письме, которое мы отправили на вашу почту.'
		};
	}

	return isTwoFactorEnabled
		? {
				title: 'Двухфакторная аутентификация включена',
				text: 'При следующем входе мы отправим код подтверждения на вашу почту.'
			}
		: {
				title: 'Двухфакторная аутентификация отключена',
				text: 'Для входа теперь достаточно почты и пароля.'
			};
};

const ConfirmSuccessWindow = () => {
	const dispatch = useAppDispatch();
	const type = useAppSelector(state => state.confirm.type);
	const isTwoFactorEnabled = useAppSelector(
		state => state.user.isTwoFactorEnabled
	);
	const isPasswordChange = type === 'password/change';

	const { title, text } = isPasswordChange
		? {
				title: 'Пароль изменён',
				text: 'Все сессии завершены. Войдите в аккаунт с новым паролем.'
			}
		: getTwoFactorContent(isTwoFactorEnabled);

	return (
		<div className='confirm-form confirm-form--success'>
			<h2 className='confirm-form__title'>{title}</h2>
			<span>{text}</span>
			<Button
				onClick={() =>
					dispatch(
						isPasswordChange
							? Modal.actions.openModal('login')
							: Modal.actions.closeModal()
					)
				}
			>
				{isPasswordChange ? 'Войти' : 'Хорошо'}
			</Button>
		</div>
	);
};

export default ConfirmSuccessWindow;
