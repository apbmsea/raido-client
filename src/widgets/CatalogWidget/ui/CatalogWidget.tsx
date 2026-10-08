import { Catalog, useOpenCatalogPage } from '@entities/catalog';
import { Menu } from '@features/menu';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import ArrowRightIcon from '@shared/icons/ArrowRight';
import { Button } from '@shared/ui/Button';
import { HOME_CATEGORIES } from '../model/categories';
import './CatalogWidget.scss';

const CatalogWidget = () => {
	const dispatch = useAppDispatch();
	const openCatalogPage = useOpenCatalogPage();

	const openCatalog = () => dispatch(Menu.actions.openCatalog());

	const openCategory = (categoryId: number) => {
		dispatch(Catalog.actions.navigateToCategory({ id: categoryId }));
		openCatalogPage();
	};

	return (
		<section className='catalog-widget'>
			<div className='catalog-widget__head'>
				<h2 className='catalog-widget__title'>Каталог</h2>

				<Button
					variant='outline'
					size='s'
					rightIcon={<ArrowRightIcon size={16} />}
					className='catalog-widget__button'
					onClick={openCatalog}
				>
					Перейти в каталог
				</Button>
			</div>

			<div className='catalog-widget__items'>
				{HOME_CATEGORIES.map(item => (
					<button
						type='button'
						key={item.title}
						className='catalog-widget__item'
						onClick={() => openCategory(item.categoryId)}
					>
						<span className='catalog-widget__item-title'>
							{item.title}
						</span>
						<img
							src={item.image}
							alt=''
							className='catalog-widget__image'
							loading='lazy'
						/>
					</button>
				))}

				<button
					type='button'
					className='catalog-widget__item catalog-widget__item--more'
					onClick={openCatalog}
				>
					<span className='catalog-widget__item-title'>
						Перейти в каталог
					</span>
					<span className='catalog-widget__more-icon'>
						<ArrowRightIcon size={28} />
					</span>
				</button>
			</div>
		</section>
	);
};

export default CatalogWidget;
