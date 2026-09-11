import { Button } from '@shared/ui/Button';
import FavoriteIcon from '@shared/icons/Favorite';
import { IconButton } from '@shared/ui/IconButton';
import ProfileIcon from '@shared/icons/Profile';
import CartIcon from '@shared/icons/Cart';
import OrdersIcon from '@shared/icons/Orders';
import './Header.scss';
import { Input } from '@shared/ui/Input';
import SearchIcon from '@shared/icons/Search';
import CatalogIcon from '@shared/icons/Catalog';
import MenuIcon from '@shared/icons/Menu';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Menu } from '@features/menu';
import { CatalogMenu } from '@features/catalogMenu';
import { useNavigate } from 'react-router-dom';
import { Search } from '@features/search';
import { useEffect } from 'react';

const Header = () => {
	const dispatch = useAppDispatch();
	const { isOpen } = useAppSelector(state => state.catalogMenu);
	const navigate = useNavigate();
	const searchValue = useAppSelector(state => state.search.search);
	const favoriteTotal = useAppSelector(state => state.favorite.total);

	useEffect(() => {
		if (!searchValue.trim()) return;

		const timer = setTimeout(() => {
			dispatch(Search.actions.searchRequest(searchValue));
		}, 500);

		return () => clearTimeout(timer);
	}, [searchValue, dispatch]);

	return (
		<header className='header'>
			<div className='header__content'>
				<IconButton
					onClick={() => dispatch(Menu.actions.setIsOpen(true))}
					title='Меню'
					className='visible-tablet'
					size={45}
					icon={<MenuIcon />}
				/>
				<div
					className='header__content-logo'
					onClick={() => navigate('/')}
				>
					<img src='./logo.png' alt='РАЙДО СЕРВИС' />
				</div>
				<Button
					onClick={() =>
						dispatch(CatalogMenu.actions.setIsOpen(!isOpen))
					}
					title='Каталог'
					className='header__content-сatalog hidden-tablet'
					size='s'
					rightIcon={<CatalogIcon />}
				>
					Каталог
				</Button>
			</div>

			<div className='header__search'>
				<Input
					placeholder='Поиск'
					value={searchValue}
					onChange={e =>
						dispatch(Search.actions.searchRequest(e.target.value))
					}
					button={
						<IconButton
							variant='primary'
							size={32}
							icon={<SearchIcon size={19} />}
							onClick={() =>
								dispatch(
									Search.actions.searchRequest(searchValue)
								)
							}
						/>
					}
				/>
			</div>

			<div className='header__buttons'>
				<IconButton
					title='Заказы'
					size={45}
					counter={1}
					icon={<OrdersIcon />}
				/>
				<IconButton
					onClick={() => navigate('/favorite')}
					title='Избранное'
					counter={favoriteTotal}
					size={45}
					icon={<FavoriteIcon />}
				/>
				<IconButton
					onClick={() => navigate('/cart')}
					title='Корзина'
					size={45}
					counter={2}
					icon={<CartIcon />}
				/>
				<IconButton
					onClick={() => navigate('/profile/options')}
					title='Профиль'
					size={45}
					icon={<ProfileIcon />}
				/>
			</div>
		</header>
	);
};

export default Header;
