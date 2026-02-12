import { setNavigate } from '@shared/utils/navigate';
import { Header } from '@widgets/Header';
import { Navbar } from '@widgets/Navbar';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.scss';
import { BurgerMenu } from '@features/menu';
import { Footer } from '@widgets/Footer';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Categories } from '@entities/category';
import { CatalogMenu } from '@features/catalog';
import { ModalWindow } from '@features/modal';

const Layout = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isOpen = useAppSelector(state => state.catalog.isOpen);

	useEffect(() => {
		setNavigate(navigate);
	}, [navigate]);

	useEffect(() => {
		dispatch(Categories.actions.getCategoriesRequest());
	}, [dispatch]);

	return (
		<div className='app-layout'>
			<ModalWindow />
			<BurgerMenu />
			<Header />
			<Navbar />
			{isOpen && <CatalogMenu />}
			{!isOpen && <Outlet />}
			{!isOpen && <Footer />}
		</div>
	);
};

export default Layout;
