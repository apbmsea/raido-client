import { IconButton } from '@shared/ui/IconButton';
import './CatalogWidget.scss';
import ArrowRigthIcon from '@shared/icons/ArrowRight';
import { Button } from '@shared/ui/Button';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { Menu } from '@features/menu';
import { Catalog } from '@features/catalog';

export const CATALOG_ITEMS = [
	{ id: '1', title: 'Компьютеры и ноутбуки', image: 'catalog1.png' },
	{ id: '2', title: 'Печать и сканирование', image: 'catalog2.png' },
	{
		id: '3',
		title: 'Расходные материалы для оргтехники',
		image: 'catalog3.png'
	},
	{ id: '4', title: 'Комплектующие', image: 'catalog4.png' },
	{ id: '5', title: 'Бытовая техника для кухни', image: 'catalog5.png' },
	{ id: '6', title: 'Смартфоны и телефония', image: 'catalog6.png' },
	{ id: '7', title: 'Периферия', image: 'catalog7.png' },
	{ id: '8', title: 'Телевизоры и мультимедиа', image: 'catalog8.png' }
];

const CatalogWidget = () => {
	const dispatch = useAppDispatch();
	const firstRow = CATALOG_ITEMS.slice(0, 4);
	const secondRow = CATALOG_ITEMS.slice(4);

	const openCatalog = () => {
		dispatch(Menu.actions.setIsOpen(true));
		dispatch(Catalog.actions.setIsOpen(true));
	};

	return (
		<section className='catalog-widget'>
			<div className='catalog-widget__head'>
				<h2 className='catalog-widget__title'>Каталог</h2>

				<Button
					variant='outline'
					rightIcon={<ArrowRigthIcon width={16} />}
					className='catalog-widget__button'
					onClick={openCatalog}
				>
					Перейти в каталог
				</Button>
			</div>

			<div className='catalog-widget__items'>
				<div className='catalog-widget__row'>
					{firstRow.map(item => (
						<div key={item.id} className='catalog-widget__item'>
							<p className='catalog-widget__item-title'>
								{item.title}
							</p>
							<div className='catalog-widget__container'>
								<img
									src={`./${item.image}`}
									alt=''
									className='catalog-widget__container-image'
								/>
							</div>
						</div>
					))}
				</div>

				<div className='catalog-widget__row'>
					{secondRow.map(item => (
						<div key={item.id} className='catalog-widget__item'>
							<p className='catalog-widget__item-title'>
								{item.title}
							</p>
							<div className='catalog-widget__container'>
								<img
									src={`./${item.image}`}
									alt=''
									className='catalog-widget__container-image'
								/>
							</div>
						</div>
					))}

					<div className='catalog-widget__more'>
						<p>Перейти в каталог</p>
						<IconButton
							className='catalog-widget__more-catalog'
							title='Каталог'
							size={82}
							icon={<ArrowRigthIcon />}
							onClick={openCatalog}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CatalogWidget;
