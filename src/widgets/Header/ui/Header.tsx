import { Link, useNavigate } from 'react-router-dom';
import { Menu, selectIsCatalogOpen } from '@features/menu';
import { SearchBar } from '@features/search';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import CartIcon from '@shared/icons/Cart';
import CatalogIcon from '@shared/icons/Catalog';
import FavoriteIcon from '@shared/icons/Favorite';
import MenuIcon from '@shared/icons/Menu';
import OrdersIcon from '@shared/icons/Orders';
import ProfileIcon from '@shared/icons/Profile';
import { Button } from '@shared/ui/Button';
import { IconButton } from '@shared/ui/IconButton';
import './Header.scss';

const Header = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isCatalogOpen = useAppSelector(selectIsCatalogOpen);
	const favoriteTotal = useAppSelector(state => state.favorite.total);
	const cartTotal = useAppSelector(state => state.cart.total);
	const orderTotal = useAppSelector(state => state.order.total);

	return (
		<header className='header'>
			<div className='header__main'>
				<IconButton
					onClick={() => dispatch(Menu.actions.openMenu())}
					aria-label='Открыть меню'
					className='visible-tablet'
					size='m'
					icon={<MenuIcon />}
				/>
				<Link className='header__logo' to='/' aria-label='На главную'>
					<img src='/logo.png' alt='Райдо Сервис' width={169} height={50} />
				</Link>
				<Button
					onClick={() => dispatch(Menu.actions.toggleCatalog())}
					aria-expanded={isCatalogOpen}
					className='hidden-tablet'
					size='s'
					rightIcon={<CatalogIcon />}
				>
					Каталог
				</Button>
			</div>

			<SearchBar className='header__search' />

			<nav className='header__actions' aria-label='Личный кабинет'>
				<IconButton
					onClick={() => navigate('/profile/orders')}
					aria-label='Заказы'
					title='Заказы'
					className='hidden-mobile'
					size='m'
					counter={orderTotal}
					icon={<OrdersIcon />}
				/>
				<IconButton
					onClick={() => navigate('/favorite')}
					aria-label='Избранное'
					title='Избранное'
					counter={favoriteTotal}
					size='m'
					icon={<FavoriteIcon />}
				/>
				<IconButton
					onClick={() => navigate('/cart')}
					aria-label='Корзина'
					title='Корзина'
					size='m'
					counter={cartTotal}
					icon={<CartIcon />}
				/>
				<IconButton
					onClick={() => navigate('/profile')}
					aria-label='Профиль'
					title='Профиль'
					size='m'
					icon={<ProfileIcon />}
				/>
			</nav>
		</header>
	);
};

export default Header;
