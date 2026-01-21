import React from 'react';
import './Navbar.scss';
import ArrowDownIcon from '@shared/icons/ArrowDown';
import { NAV_ITEMS } from '@shared/constants/navbar';

const Navbar = () => {
	const [activeId, setActiveId] = React.useState<string | null>(null);

	return (
		<nav className='navbar hidden-tablet'>
			<div className='navbar__top'>
				{NAV_ITEMS.map(item => {
					const isActive = activeId === item.id;

					return (
						<div key={item.id} className='navbar__item'>
							<button
								type='button'
								className={`navbar__link ${
									isActive ? 'navbar__link--active' : ''
								}`}
								onClick={() =>
									setActiveId(prev =>
										prev === item.id ? null : item.id
									)
								}
							>
								{item.title}

								<span
									className={`navbar__icon ${
										isActive ? 'navbar__icon--open' : ''
									}`}
								>
									<ArrowDownIcon size={19} />
								</span>
							</button>

							<div
								className={`navbar__dropdown ${
									isActive ? 'navbar__dropdown--open' : ''
								}`}
							>
								{item.content?.map(link => (
									<a
										key={link.link}
										href={link.link}
										className='navbar__dropdown-link'
									>
										{link.title}
									</a>
								))}
							</div>
						</div>
					);
				})}
			</div>
		</nav>
	);
};

export default Navbar;
