import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useEffect } from 'react';
import { Manager } from '..';
import { Loader } from '@shared/ui/Loader';
import './OrganizationList.scss';
import { OrganizationCard } from './OrganizationCard';

const OrganizationList = () => {
	const { organizations, isLoading } = useAppSelector(state => state.manager);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(Manager.actions.getManagedOrganizationsRequest());
	}, []);

	if (isLoading) return <Loader />;

	if (organizations.length === 0)
		return (
			<div className='organization-null'>
				Вы не привязанны ни к одной организации.
			</div>
		);

	return (
		<div className='organization-list'>
			{organizations.map(organization => (
				<OrganizationCard organization={organization} />
			))}
		</div>
	);
};

export default OrganizationList;
