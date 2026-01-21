import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { IconButton } from '@shared/ui/IconButton';
import { Menu } from '..';
import CloseIcon from '@shared/icons/Close';
import './Menu.scss';
import MobileNavbar from './MobileNavbar';


const BurgerMenu = () => {
	const dispatch = useAppDispatch();
	const { isOpen, type } = useAppSelector(state => state.menu);

	if (!isOpen) return null;

	return (
		<div className='menu'>
			<div className='menu__header'>
				{/* <IconButton
					onClick={() => dispatch(Menu.actions.setIsOpen(true))}
					title='Меню'
					className='visible-tablet'
					size={45}
					icon={<MenuIcon />}
				/> */}
				<div className='menu__header-logo'>
					<img src='./logo.png' alt='РАЙДО СЕРВИС' />
				</div>
				<IconButton
					onClick={() => dispatch(Menu.actions.setIsOpen(false))}
					title='Меню'
					className='menu__header-close'
					size={45}
					icon={<CloseIcon />}
				/>
			</div>
			<div className='menu__content'>{type === 'menu' && <MobileNavbar />}</div>
		</div>
	);
};

export default BurgerMenu;
