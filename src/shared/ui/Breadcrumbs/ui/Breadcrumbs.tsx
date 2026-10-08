import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

export interface BreadcrumbItem {
	label: string;
	/** Без ссылки и обработчика — текущая страница */
	to?: string;
	/** Для переходов, которые задаются не адресом, а действием */
	onClick?: () => void;
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
	return (
		<nav className='breadcrumbs' aria-label='Хлебные крошки'>
			<ol className='breadcrumbs__list'>
				{items.map((item, index) => (
					// Названия могут совпадать: подкатегория бывает тёзкой категории
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
