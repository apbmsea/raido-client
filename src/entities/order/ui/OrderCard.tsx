import { formatDate } from '@shared/utils/formatDate';
import { formatPrice } from '@shared/utils/formatPrice';
import { Link } from 'react-router-dom';

import type { OrderType } from '../model/orderTypes';

import './OrderCard.scss';

type OrderCardProps = {
	item: OrderType;
};

const MAX_VISIBLE_IMAGES = 5;

export const OrderCard = ({ item }: OrderCardProps) => {
	const hasMoreItems = item.items.length > MAX_VISIBLE_IMAGES;
	const visibleItems = hasMoreItems
		? item.items.slice(0, MAX_VISIBLE_IMAGES - 1)
		: item.items;

	const hiddenItemsCount = item.items.length - visibleItems.length;

	return (
		<Link className='order-card' to={`/profile/orders/${item.id}`}>
			<div className='order-card__content'>
				<div className='order-card__header'>
					<div className='order-card__heading'>
						<h2 className='order-card__title'>Заказ №{item.id}</h2>
						<span className='order-card__date'>
							{formatDate(item.created_at, 'dayMonth')}
						</span>
					</div>

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
									alt={product.product_name}
									loading='lazy'
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
							+{hiddenItemsCount}
						</div>
					)}
				</div>
			</div>

			<div className='order-card__info'>
				<span className='order-card__price'>
					{formatPrice(item.total_amount)}
				</span>

				<span
					className={`order-card__payment-status order-card__payment-status--${item.payment_status}`}
				>
					{item.payment_status_label}
				</span>
			</div>
		</Link>
	);
};
