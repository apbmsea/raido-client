import { Outlet, Link } from 'react-router-dom';
import './ProfilePage.scss';

export const ProfilePage = () => {
	return (
		<div className='profile-page'>
			<h2>Профиль</h2>
			<div className='profile-page__content'>
				<aside style={{ width: '260px' }}>
					<nav>
						<Link to='/profile/options'>Личные данные</Link>
						<Link to='/profile/orders'>Мои заказы</Link>
						<Link to='/profile/favorites'>Избранное</Link>
					</nav>
				</aside>
				<div style={{ width: "100%"}}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};
