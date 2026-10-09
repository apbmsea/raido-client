import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

export interface BreadcrumbItem {
	label: string;
	to?: string;
	onClick?: () => void;
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
	return (
		<nav className='breadcrumbs' aria-label='Хлебные крошки'>
			<ol className='breadcrumbs__list'>
				{items.map((item, index) => (
					<li className='breadcrumbs__item' key={index}>
						{item.to ? (
							<Link className='breadcrumbs__link' to={item.to}>
								{item.label}
							</Link>
						) : item.onClick ? (
							<button
								type='button'
								className='breadcrumbs__link'
								onClick={item.onClick}
							>
								{item.label}
							</button>
						) : (
							<span aria-current='page'>{item.label}</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
