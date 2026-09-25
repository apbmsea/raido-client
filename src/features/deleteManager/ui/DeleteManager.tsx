import { Manager } from '@entities/manager';
import { Modal } from '@entities/modal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import './DeleteManager.scss';

const DeleteManagerModal = () => {
	const dispatch = useAppDispatch();
	const manager = useAppSelector(state => state.manager.deleteManager);
	if (!manager) return null;

	return (
		<div className='delete-manager'>
			<h2 className='delete-manager__title'>
				Удаление менеджера
			</h2>
			<span>
				Вы точно хотите удалить менеджера <br />
				<b>{manager.email}</b>?
			</span>
			<div className='delete-manager__buttons'>
				<Button
					onClick={() =>
						dispatch(
							Manager.actions.removeManagerRequest({
								assignment_id: manager.assignment_id
							})
						)
					}
					variant='outline'
				>
					Да
				</Button>
				<Button onClick={() => dispatch(Modal.actions.closeModal())}>
					Нет
				</Button>
			</div>
		</div>
	);
};

export default DeleteManagerModal;
