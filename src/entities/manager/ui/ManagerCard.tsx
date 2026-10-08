import { IconButton } from '@shared/ui/IconButton';
import TrashIcon from '@shared/icons/Trash';
import type { ManagerType } from '../model/managerTypes';
import './ManagerCard.scss';

type ManagerCardProps = {
	manager: ManagerType;
	onDelete?: (manager: ManagerType) => void;
};

export const ManagerCard = ({ manager, onDelete }: ManagerCardProps) => {
	const fullName = [manager.name, manager.surname].filter(Boolean).join(' ');

	return (
		<div className='manager-card'>
			<div className='manager-card__information'>
				<h3 className='manager-card__name'>
					{fullName || 'Имя не указано'}
				</h3>
				<span className='manager-card__email'>{manager.email}</span>
			</div>
			{onDelete && (
				<IconButton
					variant='ghost'
					size='m'
					onClick={() => onDelete(manager)}
					aria-label={`Удалить менеджера ${manager.email}`}
					icon={<TrashIcon />}
				/>
			)}
		</div>
	);
};
