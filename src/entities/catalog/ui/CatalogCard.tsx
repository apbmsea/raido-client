import { Button } from '@shared/ui/Button';
import type { Product } from '../model/catalog.type';
import CartIcon from '@shared/icons/Cart';
import { ImageSlider } from '@features/imageSlider';
import './CatalogCard.scss';
import { IconButton } from '@shared/ui/IconButton';
import FavoriteIcon from '@shared/icons/Favorite';
import { useNavigate } from 'react-router-dom';

type CatalogCardProps = { item: Product; variant: 'grid' | 'list' };

const CatalogCard = ({ item, variant }: CatalogCardProps) => {
	const navigate = useNavigate();
	return (
		<div className={`catalog-card catalog-card--${variant}`}>
			<ImageSlider images={item.images} />
			<div
				onClick={() => navigate(`/product/${item.id}`)}
				className={`catalog-card__content catalog-card__content--${variant}`}
			>
				{variant === 'grid' ? (
					<>
						<span className='catalog-card__content-name'>
							{item.name}
						</span>
						<div className='catalog-card__content-prices'>
							<span className='catalog-card__content-finalprice'>
								{new Intl.NumberFormat('ru-RU', {
									style: 'currency',
									currency: 'RUB',
									minimumFractionDigits: 0
								}).format(Number(item.final_price))}
							</span>
							<span className='catalog-card__content-retailprice'>
								{new Intl.NumberFormat('ru-RU', {
									style: 'currency',
									currency: 'RUB',
									minimumFractionDigits: 0,
									maximumFractionDigits: 0
								}).format(
									Number(
										item.retail_price !== ''
											? Number(item.final_price) * 1.25
											: item.retail_price
									)
								)}
							</span>
							<span className='catalog-card__content-discount'>
								{item.discount_percentage !== ''
									? '25'
									: `${item.discount_percentage}`}
								%
							</span>
						</div>
						<Button rightIcon={<CartIcon />}>В корзину</Button>
					</>
				) : (
					<>
						<div className='catalog-card__info'>
							<span className='catalog-card__info-name'>
								{item.name}
							</span>
							<span className='catalog-card__info-code'>
								Код товара: 0000000
							</span>
							<div className='catalog-card__delivery'>
								<span>Доставка завтра, 10 марта</span>
								<span>Самовывоз сегодня, 9 марта</span>
							</div>
							<div className='catalog-card__content-prices'>
								<span className='catalog-card__content-finalprice'>
									{new Intl.NumberFormat('ru-RU', {
										style: 'currency',
										currency: 'RUB',
										minimumFractionDigits: 0
									}).format(Number(item.final_price))}
								</span>
								<span className='catalog-card__content-retailprice'>
									{new Intl.NumberFormat('ru-RU', {
										style: 'currency',
										currency: 'RUB',
										minimumFractionDigits: 0,
										maximumFractionDigits: 0
									}).format(
										Number(
											item.retail_price !== ''
												? Number(item.final_price) *
														1.25
												: item.retail_price
										)
									)}
								</span>
								<span className='catalog-card__content-discount'>
									{item.discount_percentage !== ''
										? '25'
										: `${item.discount_percentage}`}
									%
								</span>
							</div>
						</div>
						<div className='catalog-card__buttons'>
							<IconButton icon={<FavoriteIcon />} />
							<Button rightIcon={<CartIcon />}>В корзину</Button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CatalogCard;
