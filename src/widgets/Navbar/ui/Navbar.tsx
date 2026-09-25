import { useEffect, useRef, useState } from 'react';
import './Navbar.scss';
import { NAV_ITEMS } from '@shared/constants/navbar';
import ArrowDownIcon from '@shared/icons/ArrowDown';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { CatalogMenu } from '@features/catalogMenu';
import { Menu } from '@features/menu';

export default function Navbar() {
	const [active, setActive] = useState<string | null>(null);
	const [submenuHeight, setSubmenuHeight] = useState(0);

	const dispatch = useAppDispatch();

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			setSubmenuHeight(ref.current.scrollHeight);
		}
	}, [active]);

	return (
		<nav
			className='nav hidden-tablet'
			style={{ paddingBottom: active ? submenuHeight : 0 }}
		>
			<div className='nav__container'>
				{NAV_ITEMS.map(item => (
					<div key={item.id} className='nav__item'>
						<button
							className={`nav__link ${
								active === item.id ? 'nav__link--active' : ''
							}`}
							onClick={() =>
								setActive(prev =>
									prev === item.id ? null : item.id
								)
							}
						>
							{item.title}
							<span
								className={`nav__icon ${
									active === item.id ? 'nav__icon--open' : ''
								}`}
							>
								<ArrowDownIcon size={14} />
							</span>
						</button>
						<div
							ref={active === item.id ? ref : null}
							className={`nav__submenu ${
								active === item.id ? 'nav__submenu--open' : ''
							}`}
						>
							{item.content.map(link => (
								<a
									key={link.title}
									href={link.link}
									onClick={() => {
										dispatch(
											CatalogMenu.actions.setIsOpen(false)
										);
										dispatch(Menu.actions.setIsOpen(false));
									}}
									className='nav__submenu-link'
								>
									{link.title}
								</a>
							))}
						</div>
					</div>
				))}
			</div>
		</nav>
	);
}
