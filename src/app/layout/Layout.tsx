import { Outlet, ScrollRestoration } from 'react-router-dom';
import { BurgerMenu } from '@widgets/BurgerMenu';
import { CatalogMenu } from '@widgets/CatalogMenu';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import { ModalRoot } from '@widgets/ModalRoot';
import { Navbar } from '@widgets/Navbar';
import { useAppInit } from './useAppInit';
import './Layout.scss';

const Layout = () => {
	useAppInit();

	return (
		<div className='app-layout'>
			<Header />
			<Navbar />

			{/* Каталог открывается поверх этой области, не размонтируя страницу */}
			<div className='app-layout__body'>
				<CatalogMenu />
				<div className='app-layout__content'>
					<Outlet />
				</div>
				<Footer />
			</div>

			<BurgerMenu />
			<ModalRoot />
			<ScrollRestoration />
		</div>
	);
};

export default Layout;
