import type { Product } from '../model/catalog.type';
import { ImageSlider } from '@features/imageSlider';
import './CatalogCard.scss';
import { IconButton } from '@shared/ui/IconButton';
import FavoriteIcon from '@shared/icons/Favorite';
import { useNavigate } from 'react-router-dom';
import { AddItemToCartButton } from '@features/addItemToCart';
import { AddItemToFavoriteButton } from '@features/addItemToFavorite';

type CatalogCardProps = { item: Product; variant: 'grid' | 'list' };

const CatalogCard = ({ item, variant }: CatalogCardProps) => {
	const navigate = useNavigate();

	return (
		<div className={`catalog-card catalog-card--${variant}`}>
			<ImageSlider images={item.images} />
			<div
				className={`catalog-card__content catalog-card__content--${variant}`}
			>
				{variant === 'grid' ? (
					<>
						<span
							onClick={() => navigate(`/product/${item.id}`)}
							className='catalog-card__content-name'
						>
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
										item.retail_price === ''
											? Number(item.final_price) * 1.25
											: item.retail_price
									)
								)}
							</span>
							<span className='catalog-card__content-discount'>
								{item.discount_percentage === '' || '0'
									? '25'
									: `${item.discount_percentage}`}
								%
							</span>
						</div>
						<div className='catalog-card__buttons-stack'>
							<AddItemToCartButton productId={item.id} />
							<AddItemToFavoriteButton productId={item.id} />
						</div>
					</>
				) : (
					<>
						<div className='catalog-card__info'>
							<span
								onClick={() => navigate(`/product/${item.id}`)}
								className='catalog-card__info-name'
							>
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
							<AddItemToFavoriteButton productId={item.id} />
							<AddItemToCartButton productId={item.id} />
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CatalogCard;
