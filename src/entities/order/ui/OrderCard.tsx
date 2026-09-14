import { formatIso } from '@shared/utils/formatIso';
import { formatPrice } from '@shared/utils/formatPrice';

import type { Order } from '../model/orderTypes';

import './OrderCard.scss';

type OrderCardProps = {
	item: Order;
};

const MAX_VISIBLE_IMAGES = 5;

export const OrderCard = ({ item }: OrderCardProps) => {
	const hasMoreItems = item.items.length > MAX_VISIBLE_IMAGES;
	const visibleItems = hasMoreItems
		? item.items.slice(0, MAX_VISIBLE_IMAGES - 1)
		: item.items;

	const hiddenItemsCount = item.items.length - visibleItems.length;

	return (
		<div className='order-card'>
			<div className='order-card__content'>
				<div className='order-card__header'>
					<h2 className='order-card__title'>
						Заказ от {formatIso(item.created_at)}
					</h2>

					<span
						className={`order-card__status order-card__status--${item.status}`}
					>
						{item.status_label}
					</span>
				</div>

				<div className='order-card__items'>
					{visibleItems.map(product => (
						<div className='order-card__item' key={product.id}>
							{product.product_image?.image_250x250 ? (
								<img
									className='order-card__image'
									src={product.product_image.image_250x250}
									alt=''
								/>
							) : (
								<div className='order-card__no-image'>
									Нет фото
								</div>
							)}
						</div>
					))}

					{hasMoreItems && (
						<div className='order-card__item order-card__item--more'>
							<span>+{hiddenItemsCount}</span>
						</div>
					)}
				</div>
			</div>

			<div className='order-card__info'>
				<span className='order-card__price'>
					{formatPrice(Number(item.total_amount))}
				</span>

				<span
					className={`order-card__payment-status order-card__payment-status--${item.payment_status}`}
				>
					{item.payment_status_label}
				</span>
			</div>
		</div>
	);
};
