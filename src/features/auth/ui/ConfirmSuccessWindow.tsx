import { Modal } from '@entities/modal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';

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
		<div className='modal-form'>
			<h2 className='modal-form__title'>{title}</h2>
			<p className='modal-form__text'>{text}</p>
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
