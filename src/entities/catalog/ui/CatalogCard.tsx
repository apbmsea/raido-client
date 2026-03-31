import { Button } from '@shared/ui/Button';
import type { Product } from '../model/catalog.type';
import CartIcon from '@shared/icons/Cart';
import { ImageSlider } from '@features/imageSlider';
import './CatalogCard.scss';

type CatalogCardProps = { item: Product };

const CatalogCard = ({ item }: CatalogCardProps) => {
	return (
		<div className='catalog-card'>
			<ImageSlider images={item.images} />
			<div className='catalog-card__content'>
				<span className="catalog-card__content-name">{item.name}</span>
				<div>
					<span className="catalog-card__content-finalprice">
						{new Intl.NumberFormat('ru-RU', {
							style: 'currency',
							currency: 'RUB',
							minimumFractionDigits: 0
						}).format(Number(item.final_price))}
					</span>
					{item.has_discount && (
						<>
							<span>
								{new Intl.NumberFormat('ru-RU', {
									style: 'currency',
									currency: 'RUB',
									minimumFractionDigits: 0
								}).format(Number(item.retail_price))}
							</span>
							<span>{item.discount_percentage}%</span>
						</>
					)}
				</div>
				<Button rightIcon={<CartIcon />}>В корзину</Button>
			</div>
		</div>
	);
};

export default CatalogCard;
