import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ImageSlider } from '@shared/ui/ImageSlider';
import { formatPrice } from '@shared/utils/formatPrice';
import { hasInfo } from '@shared/utils/hasInfo';
import type { Product } from '../model/productTypes';
import { getDeliveryDate } from '../lib/getDeliveryDate';
import { getDiscountPercent } from '../lib/getDiscountPercent';

import './ProductCard.scss';

type ProductCardProps = {
	item: Product;
	variant: 'grid' | 'list';
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
	const details = [
		hasInfo(item.sku) && `Код товара: ${item.sku}`,
		hasInfo(item.producer) && `Производитель: ${item.producer}`,
		hasInfo(item.warranty) &&
			(/^гарантия/i.test(item.warranty)
				? item.warranty
				: `Гарантия: ${item.warranty}`)
	].filter((detail): detail is string => !!detail);

	return (
		<article
			className={clsx(
				'product-card',
				`product-card--${variant}`,
				className
			)}
		>
			<div className='product-card__image'>
				<Link to={productLink} tabIndex={-1} aria-hidden='true'>
					<ImageSlider images={item.images} alt={item.name} />
				</Link>

				{variant === 'grid' && discountPercent && (
					<span className='product-card__badge'>
						{discountPercent}%
					</span>
				)}
			</div>

			<div className='product-card__content'>
				<div className='product-card__info'>
					<Link className='product-card__name' to={productLink}>
						{item.name}
					</Link>

					{variant === 'list' && (
						<>
							{details.length > 0 && (
								<div className='product-card__details'>
									{details.map(detail => (
										<span key={detail}>{detail}</span>
									))}
								</div>
							)}
							<div className='product-card__delivery'>
								<span
									className={clsx(
										'product-card__stock',
										!item.in_stock &&
											'product-card__stock--out'
									)}
								>
									{item.in_stock
										? 'В наличии'
										: 'Нет в наличии'}
								</span>
								{item.in_stock && deliveryDate && (
									<span>Доставка: {deliveryDate}</span>
								)}
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
