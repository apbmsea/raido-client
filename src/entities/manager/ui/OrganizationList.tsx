import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { EmptyState } from '@shared/ui/EmptyState';
import { Loader } from '@shared/ui/Loader';
import { actions } from '../model/managerSlice';
import './ManagerCard.scss';
import './ManagerList.scss';

const OrganizationList = () => {
	const { organizations, isLoading } = useAppSelector(state => state.manager);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(actions.getManagedOrganizationsRequest());
	}, [dispatch]);

	if (isLoading && organizations.length === 0) return <Loader />;

	if (organizations.length === 0) {
		return (
			<EmptyState
				variant='compact'
				title='Вы не привязаны ни к одной организации.'
			/>
		);
	}

	return (
		<div className='manager-list'>
			{organizations.map(organization => (
				<div className='manager-card' key={organization.organization_id}>
					<div className='manager-card__information'>
						<h3 className='manager-card__name'>
							{organization.organization_name}
						</h3>
						<span className='manager-card__email'>
							{organization.email}
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default OrganizationList;
