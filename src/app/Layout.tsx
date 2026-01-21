import { setNavigate } from '@shared/utils/navigate';
import { Header } from '@widgets/Header';
import { Navbar } from '@widgets/Navbar';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './layout.scss'
import { BurgerMenu } from '@features/menu';

const Layout = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setNavigate(navigate);
	}, [navigate]);

	return (
		<div className='app-layout'>
			<BurgerMenu />
			<Header />
			<Navbar />
			<Outlet />
		</div>
	);
};

export default Layout;
