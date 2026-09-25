import './OrganizationCard.scss';
import type { Organization as OrganizationType } from '../model/managerTypes';
type OrganizationCardProps = {
	organization: OrganizationType;
};
export const OrganizationCard = ({ organization }: OrganizationCardProps) => {
	return (
		<div className='organization-card' key={organization.organization_id}>
			<div className='organization-card__information'>
				<h3 className='organization-card__information-name'>
					{organization.organization_name}
				</h3>
				<span className='organization-card__information-email'>
					{organization.email}
				</span>
			</div>
		</div>
	);
};
