import { useAppDispatch } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import './AddManagerForm.scss';
import { Modal } from '@entities/modal';

const AddManagerForm = () => {
	const dispatch = useAppDispatch();

	return (
		<div className='add-manager-form'>
			<h2 className='add-manager-form__title'>Менеджер добавлен</h2>
			<span>На почту менеджера отправлено письмо с регистрацией. </span>
			<Button onClick={() => dispatch(Modal.actions.closeModal())}>
				Вернуться в профиль
			</Button>
		</div>
	);
};

export default AddManagerForm;
