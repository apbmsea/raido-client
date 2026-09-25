import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useEffect } from 'react';
import { Manager } from '..';
import { Loader } from '@shared/ui/Loader';
import './ManagerList.scss';
import { ManagerCard } from './ManagerCard';

const ManagerList = () => {
	const { managers, isLoading } = useAppSelector(state => state.manager);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(Manager.actions.getManagersRequest());
	}, []);

	if (isLoading) return <Loader />;

	if (managers.length === 0)
		return (
			<div className='managers-null'>
				У вашей организации пока нет менеджеров.
			</div>
		);

	return (
		<div className='manager-list'>
			{managers.map(manager => (
				<ManagerCard manager={manager} />
			))}
		</div>
	);
};

export default ManagerList;
