import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ImageSlider } from '@shared/ui/ImageSlider';
import { formatPrice } from '@shared/utils/formatPrice';
import type { Product } from '../model/productTypes';
import { getDeliveryDate } from '../lib/getDeliveryDate';
import { getDiscountPercent } from '../lib/getDiscountPercent';

import './ProductCard.scss';

type ProductCardProps = {
	item: Product;
	variant: 'grid' | 'list';
	/** Кнопки действий передаются снаружи: сущность не знает о корзине и избранном */
	cartAction?: ReactNode;
	favoriteAction?: ReactNode;
	className?: string;
};

const ProductCard = ({
	item,
	variant,
	cartAction,
	favoriteAction,
	className
}: ProductCardProps) => {
	const productLink = `/product/${item.id}`;
	const discountPercent = getDiscountPercent(item);
	const deliveryDate = getDeliveryDate(item);

	return (
		<article
			className={clsx('product-card', `product-card--${variant}`, className)}
		>
			<div className='product-card__image'>
				<Link to={productLink} tabIndex={-1} aria-hidden='true'>
					<ImageSlider images={item.images} alt={item.name} />
				</Link>

				{/* В плитке скидка лежит поверх фото, в строке — рядом с ценой */}
				{variant === 'grid' && discountPercent && (
					<span className='product-card__badge'>{discountPercent}%</span>
				)}
			</div>

			<div className='product-card__content'>
				<div className='product-card__info'>
					<Link className='product-card__name' to={productLink}>
						{item.name}
					</Link>

					{variant === 'list' && (
						<>
							{item.sku && (
								<span className='product-card__code'>
									Код товара: {item.sku}
								</span>
							)}
							<div className='product-card__delivery'>
								{item.in_stock
									? deliveryDate && <span>Доставка: {deliveryDate}</span>
									: <span>Нет в наличии</span>}
							</div>
						</>
					)}

					<div className='product-card__prices'>
						<span className='product-card__price'>
							{formatPrice(item.final_price)}
						</span>
						{discountPercent && (
							<span className='product-card__old-price'>
								{formatPrice(item.retail_price)}
							</span>
						)}
						{variant === 'list' && discountPercent && (
							<span className='product-card__discount'>
								{discountPercent}%
							</span>
						)}
					</div>
				</div>

				{(cartAction || favoriteAction) && (
					<div className='product-card__actions'>
						{cartAction}
						{favoriteAction}
					</div>
				)}
			</div>
		</article>
	);
};

export default ProductCard;
