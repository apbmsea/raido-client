import './ManagerCard.scss';
import { IconButton } from '@shared/ui/IconButton';
import TrashIcon from '@shared/icons/Trash';
import type { Manager as ManagerType } from '../model/managerTypes';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { Manager } from '..';
import { Modal } from '@entities/modal';

type ManagerCardProps = {
	manager: ManagerType;
};
export const ManagerCard = ({ manager }: ManagerCardProps) => {
	const dispatch = useAppDispatch();
	return (
		<div className='manager-card' key={manager.manager_user_id}>
			<div className='manager-card__information'>
				<h3 className='manager-card__information-name'>
					{manager.name ? manager.name : 'Имя'}{' '}
					{manager.surname ? manager.surname : 'Фамилия'}
				</h3>
				<span className='manager-card__information-email'>
					{manager.email}
				</span>
			</div>
			<IconButton
				onClick={() => {
					dispatch(Manager.actions.setDeleteManager(manager));
					dispatch(Modal.actions.openModal('deleteManager'))
				}}
				className='manager-card__delete-btn'
				icon={<TrashIcon />}
			/>
		</div>
	);
};
