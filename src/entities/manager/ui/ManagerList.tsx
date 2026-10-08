import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { EmptyState } from '@shared/ui/EmptyState';
import { Loader } from '@shared/ui/Loader';
import { actions } from '../model/managerSlice';
import type { ManagerType } from '../model/managerTypes';
import { ManagerCard } from './ManagerCard';
import './ManagerList.scss';

type ManagerListProps = {
	onDelete?: (manager: ManagerType) => void;
};

const ManagerList = ({ onDelete }: ManagerListProps) => {
	const { managers, isLoading } = useAppSelector(state => state.manager);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(actions.getManagersRequest());
	}, [dispatch]);

	if (isLoading && managers.length === 0) return <Loader />;

	if (managers.length === 0) {
		return (
			<EmptyState
				variant='compact'
				title='У вашей организации пока нет менеджеров.'
			/>
		);
	}

	return (
		<div className='manager-list'>
			{managers.map(manager => (
				<ManagerCard
					key={manager.assignment_id}
					manager={manager}
					onDelete={onDelete}
				/>
			))}
		</div>
	);
};

export default ManagerList;
