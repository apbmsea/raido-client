import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { IconButton } from '@shared/ui/IconButton';
import { Menu } from '..';
import CloseIcon from '@shared/icons/Close';
import './Menu.scss';
import MobileNavbar from './MobileNavbar';
import ArrowLeftIcon from '@shared/icons/ArrowLeft';
import { CatalogCategories } from '@features/categories';
import { CatalogSubcategories } from '@features/subcategories';

const BurgerMenu = () => {
	const dispatch = useAppDispatch();
	const { isOpen, type } = useAppSelector(state => state.menu);

	if (!isOpen) return null;

	const handleReturn = () => {
		if (type === 'category') dispatch(Menu.actions.setType('menu'));
		if (type === 'subcategory') dispatch(Menu.actions.setType('category'));
	};

	return (
		<div className='menu visible-tablet'>
			<div className='menu__header'>
				<div className='menu__header-block'>
					{type !== 'menu' && (
						<IconButton
							onClick={handleReturn}
							title='Меню'
							className='menu__header-return'
							size={45}
							icon={<ArrowLeftIcon />}
						/>
					)}
					<div className='menu__header-logo'>
						<img src='./logo.png' alt='РАЙДО СЕРВИС' />
					</div>
				</div>
				<IconButton
					onClick={() => dispatch(Menu.actions.setIsOpen(false))}
					title='Меню'
					className='menu__header-close'
					size={45}
					icon={<CloseIcon />}
				/>
			</div>
			<div className='menu__content'>
				{type === 'menu' && <MobileNavbar />}
				{type === 'category' && <CatalogCategories />}
				{type === 'subcategory' && <CatalogSubcategories />}
			</div>
		</div>
	);
};

export default BurgerMenu;
