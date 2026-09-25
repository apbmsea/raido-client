import { Button } from '@shared/ui/Button';
import CatalogIcon from '@shared/icons/Catalog';
import { NAV_ITEMS } from '@shared/constants/navbar';
import './MobileNavbar.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { Menu } from '..';
import { CatalogMenu } from '@features/catalogMenu';

const MobileNavbar = () => {
	const dispatch = useAppDispatch();

	return (
		<nav className='mobile-navbar'>
			<Button
				onClick={() => dispatch(Menu.actions.setType('category'))}
				title='Каталог'
				className='mobile-navbar__сatalog'
				size='s'
				rightIcon={<CatalogIcon />}
			>
				Каталог
			</Button>

			{NAV_ITEMS.map(item => (
				<div className='mobile-navbar__list'>
					<h1 className='mobile-navbar__list-title' key={item.id}>
						{item.title}
					</h1>

					<div className={`mobile-navbar__links`}>
						{item.content?.map(link => (
							<Link
								key={link.link}
								to={link.link}
								className='mobile-navbar__links-item'
								onClick={() => {
									dispatch(
										CatalogMenu.actions.setIsOpen(false)
									);
									dispatch(Menu.actions.setIsOpen(false));
								}}
							>
								{link.title}
							</Link>
						))}
					</div>
				</div>
			))}
		</nav>
	);
};

export default MobileNavbar;
