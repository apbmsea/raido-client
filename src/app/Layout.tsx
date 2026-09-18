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
import { CatalogMenuModal } from '@features/catalogMenu';
import { ModalWindow } from '@features/modal';
import { SearchComponent } from '@features/search';
import { User } from '@entities/user';
import { Cart } from '@entities/cart';
import { Favorite } from '@entities/favorite';
import { Order } from '@entities/order';

const Layout = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isOpen = useAppSelector(state => state.catalogMenu.isOpen);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		setNavigate(navigate);
	}, [navigate]);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		if (localStorage.getItem('token')) {
			dispatch(User.actions.getUserRequest());
		} else {
			dispatch(User.actions.getUserFailure());
		}
	}, [dispatch]);

	useEffect(() => {
		dispatch(Categories.actions.getCategoriesRequest());
		dispatch(Cart.actions.getCartRequest());
		dispatch(Favorite.actions.getFavoriteRequest());
		dispatch(Order.actions.getOrdersRequest());
	}, [dispatch]);

	return (
		<div className='app-layout'>
			<ModalWindow />
			<BurgerMenu />
			<Header />
			<Navbar />
			<SearchComponent />

			<main className='app-content'>
				{isOpen ? <CatalogMenuModal /> : <Outlet />}
			</main>

			{!isOpen && <Footer />}
		</div>
	);
};

export default Layout;
