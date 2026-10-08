import { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';
import { NAV_ITEMS } from '@shared/constants/navbar';
import { useClickOutside } from '@shared/hooks/useClickOutside.hook';
import ArrowDownIcon from '@shared/icons/ArrowDown';
import { AppLink } from '@shared/ui/AppLink';
import './Navbar.scss';

const Navbar = () => {
	const [activeId, setActiveId] = useState<string | null>(null);
	// Полоса навигации раздвигается на высоту открытого списка ссылок
	const [submenuHeight, setSubmenuHeight] = useState(0);
	const navRef = useRef<HTMLElement>(null);
	const submenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const close = useCallback(() => setActiveId(null), []);
	useClickOutside(navRef, close, activeId !== null);

	const toggle = (id: string) => {
		if (activeId === id) {
			close();
			return;
		}

		setSubmenuHeight(submenuRefs.current[id]?.scrollHeight ?? 0);
		setActiveId(id);
	};

	return (
		<nav
			className='nav hidden-tablet'
			ref={navRef}
			aria-label='Разделы сайта'
			style={{ paddingBottom: activeId ? submenuHeight : 0 }}
		>
			<ul className='nav__list'>
				{NAV_ITEMS.map(item => {
					const isOpen = activeId === item.id;

					return (
						<li key={item.id} className='nav__item'>
							<button
								type='button'
								className={clsx(
									'nav__button',
									isOpen && 'nav__button--active'
								)}
								aria-expanded={isOpen}
								onClick={() => toggle(item.id)}
							>
								{item.title}
								<ArrowDownIcon size={14} className='nav__icon' />
							</button>
							<div
								ref={el => {
									submenuRefs.current[item.id] = el;
								}}
								className={clsx(
									'nav__submenu',
									isOpen && 'nav__submenu--open'
								)}
							>
								{item.content.map(link => (
									<AppLink
										key={link.link}
										to={link.link}
										isExternal={link.isExternal}
										onClick={close}
										className='nav__link'
									>
										{link.title}
									</AppLink>
								))}
							</div>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navbar;
