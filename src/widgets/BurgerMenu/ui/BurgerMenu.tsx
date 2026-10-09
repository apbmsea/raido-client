import {
	CatalogCategories,
	CatalogSubcategories,
	Menu,
	type MenuScreen
} from '@features/menu';
import { TABLET_QUERY } from '@shared/constants/breakpoints';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useLockScroll } from '@shared/hooks/useLockScroll.hook';
import { useMediaQuery } from '@shared/hooks/useMediaQuery.hook';
import ArrowLeftIcon from '@shared/icons/ArrowLeft';
import CloseIcon from '@shared/icons/Close';
import { IconButton } from '@shared/ui/IconButton';
import MobileNavbar from './MobileNavbar';
import './BurgerMenu.scss';

const PREVIOUS_SCREEN: Record<MenuScreen, MenuScreen | null> = {
	menu: null,
	category: 'menu',
	subcategory: 'category'
};

const BurgerMenu = () => {
	const dispatch = useAppDispatch();
	const { isOpen, screen } = useAppSelector(state => state.menu);
	const isTablet = useMediaQuery(TABLET_QUERY);
	const isVisible = isOpen && isTablet;

	useLockScroll(isVisible);

	if (!isVisible) return null;

	const previousScreen = PREVIOUS_SCREEN[screen];

	return (
		<div className='burger-menu' role='dialog' aria-label='Меню'>
			<div className='burger-menu__header'>
				<div className='burger-menu__header-main'>
					{previousScreen && (
						<IconButton
							onClick={() =>
								dispatch(Menu.actions.setScreen(previousScreen))
							}
							aria-label='Назад'
							size='s'
							icon={<ArrowLeftIcon />}
						/>
					)}
					<img
						className='burger-menu__logo'
						src='/logo.png'
						alt='Райдо Сервис'
						width={169}
						height={50}
					/>
				</div>
				<IconButton
					onClick={() => dispatch(Menu.actions.close())}
					aria-label='Закрыть меню'
					size='s'
					icon={<CloseIcon />}
				/>
			</div>

			{screen === 'menu' && <MobileNavbar />}
			{screen === 'category' && <CatalogCategories />}
			{screen === 'subcategory' && <CatalogSubcategories />}
		</div>
	);
};

export default BurgerMenu;
