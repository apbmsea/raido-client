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
import {
	Search,
	SearchComponent,
	useSearchProducts,
	useSelectSuggestion
} from '@features/search';
import { type KeyboardEvent, useEffect, useState } from 'react';

const Header = () => {
	const dispatch = useAppDispatch();
	const { isOpen } = useAppSelector(state => state.catalogMenu);
	const navigate = useNavigate();
	const searchValue = useAppSelector(state => state.search.search);
	const { items: suggestions, isLoading: isSearchLoading } = useAppSelector(
		state => state.search
	);
	const [activeIndex, setActiveIndex] = useState(-1);
	const selectSuggestion = useSelectSuggestion();
	const searchProducts = useSearchProducts();
	const favoriteTotal = useAppSelector(state => state.favorite.total);
	const cartTotal = useAppSelector(state => state.cart.total);
	const orderTotal = useAppSelector(state => state.order.total);

	useEffect(() => {
		if (!searchValue.trim()) return;

		const timer = setTimeout(() => {
			dispatch(Search.actions.searchRequest(searchValue));
		}, 500);

		return () => clearTimeout(timer);
	}, [searchValue, dispatch]);

	useEffect(() => {
		setActiveIndex(-1);
	}, [suggestions]);

	const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Escape') {
			dispatch(Search.actions.searchRequest(''));
			return;
		}

		if (e.key === 'Enter') {
			e.preventDefault();

			const suggestion = suggestions[activeIndex];

			if (suggestion && !isSearchLoading) {
				selectSuggestion(suggestion);
			} else {
				searchProducts(searchValue);
			}
			return;
		}

		if (suggestions.length === 0) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setActiveIndex(index => (index + 1) % suggestions.length);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setActiveIndex(index =>
				index <= 0 ? suggestions.length - 1 : index - 1
			);
		}
	};

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
					onKeyDown={handleSearchKeyDown}
					button={
						<IconButton
							variant='primary'
							size={32}
							icon={<SearchIcon size={19} />}
							onClick={() => searchProducts(searchValue)}
						/>
					}
				/>
				<SearchComponent
					activeIndex={activeIndex}
					onActiveChange={setActiveIndex}
				/>
			</div>

			<div className='header__buttons'>
				<IconButton
					onClick={() => navigate('/profile/orders')}
					title='Заказы'
					size={45}
					counter={orderTotal}
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
					counter={cartTotal}
					icon={<CartIcon />}
				/>
				<IconButton
					onClick={() => navigate('/profile')}
					title='Профиль'
					size={45}
					icon={<ProfileIcon />}
				/>
			</div>
		</header>
	);
};

export default Header;
