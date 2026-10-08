import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

export interface BreadcrumbItem {
	label: string;
	/** Без ссылки — текущая страница */
	to?: string;
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
	return (
		<nav className='breadcrumbs' aria-label='Хлебные крошки'>
			<ol className='breadcrumbs__list'>
				{items.map(item => (
					<li className='breadcrumbs__item' key={item.label}>
						{item.to ? (
							<Link className='breadcrumbs__link' to={item.to}>
								{item.label}
							</Link>
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
