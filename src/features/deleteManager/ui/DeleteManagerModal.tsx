import { Manager } from '@entities/manager';
import { Modal } from '@entities/modal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';

const DeleteManagerModal = () => {
	const dispatch = useAppDispatch();
	const { managerToDelete, isFetch, errors } = useAppSelector(
		state => state.manager
	);
	const errorMessage = Object.values(errors)[0]?.message;

	if (!managerToDelete) return null;

	return (
		<div className='modal-form'>
			<h2 className='modal-form__title'>Удаление менеджера</h2>
			<p className='modal-form__text'>
				Вы точно хотите удалить менеджера <b>{managerToDelete.email}</b>?
			</p>
			{errorMessage && (
				<p className='modal-form__error' role='alert'>
					{errorMessage}
				</p>
			)}
			<div className='modal-form__buttons'>
				<Button
					onClick={() =>
						dispatch(
							Manager.actions.removeManagerRequest({
								assignmentId: managerToDelete.assignment_id
							})
						)
					}
					variant='outline'
					loading={isFetch}
				>
					Удалить
				</Button>
				<Button onClick={() => dispatch(Modal.actions.closeModal())}>
					Отмена
				</Button>
			</div>
		</div>
	);
};

export default DeleteManagerModal;
