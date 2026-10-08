import { Menu } from '@features/menu';
import { NAV_ITEMS } from '@shared/constants/navbar';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import CatalogIcon from '@shared/icons/Catalog';
import { AppLink } from '@shared/ui/AppLink';
import { Button } from '@shared/ui/Button';
import './MobileNavbar.scss';

const MobileNavbar = () => {
	const dispatch = useAppDispatch();

	return (
		<nav className='mobile-navbar' aria-label='Разделы сайта'>
			<Button
				onClick={() => dispatch(Menu.actions.setScreen('category'))}
				size='s'
				rightIcon={<CatalogIcon />}
			>
				Каталог
			</Button>

			{NAV_ITEMS.map(item => (
				<div className='mobile-navbar__group' key={item.id}>
					<h2 className='mobile-navbar__title'>{item.title}</h2>

					{item.content.map(link => (
						<AppLink
							key={link.link}
							to={link.link}
							isExternal={link.isExternal}
							className='mobile-navbar__link'
							onClick={() => dispatch(Menu.actions.close())}
						>
							{link.title}
						</AppLink>
					))}
				</div>
			))}
		</nav>
	);
};

export default MobileNavbar;
