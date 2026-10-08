import { Modal } from '@entities/modal';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';

const AddManagerSuccessWindow = () => {
	const dispatch = useAppDispatch();

	return (
		<div className='modal-form'>
			<h2 className='modal-form__title'>Приглашение отправлено</h2>
			<p className='modal-form__text'>
				Мы отправили менеджеру письмо со ссылкой. Он появится в списке,
				когда примет приглашение.
			</p>
			<Button onClick={() => dispatch(Modal.actions.closeModal())}>
				Вернуться в профиль
			</Button>
		</div>
	);
};

export default AddManagerSuccessWindow;
