import { OrganizationList } from '@entities/manager';
import './OrganizationsPage.scss';

const OrganizationsPage = () => {
	return (
		<section className='organizations-page'>
			<header className='organizations-page__header'>
				<h1 className='organizations-page__title'>Организации</h1>
				<p className='organizations-page__description'>
					Организации, от имени которых вы можете оформлять заказы как
					менеджер.
				</p>
			</header>
			<OrganizationList />
		</section>
	);
};

export default OrganizationsPage;
