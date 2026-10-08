import type { CartItem } from '@entities/cart';
import { formatPrice } from '@shared/utils/formatPrice';
import { plural } from '@shared/utils/plural';
import './OrderSummary.scss';

/** Состав оформляемого заказа: позиции корзины с количеством и итогом */
const OrderSummary = ({ items }: { items: CartItem[] }) => {
	const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
	// final_subtotal — стоимость позиции уже с учётом количества
	const totalPrice = items.reduce(
		(sum, item) => sum + Number(item.final_subtotal),
		0
	);

	return (
		<aside className='order-summary'>
			<h2 className='order-summary__title'>
				Оформляем {totalCount}{' '}
				{plural(totalCount, ['товар', 'товара', 'товаров'])} на{' '}
				{formatPrice(totalPrice)}
			</h2>
			<ul className='order-summary__list'>
				{items.map(item => {
					const image = item.product.images[0]?.image_88x88;

					return (
						<li className='order-summary__item' key={item.id}>
							{image ? (
								<img
									className='order-summary__image'
									src={image}
									alt=''
									loading='lazy'
								/>
							) : (
								<div className='order-summary__image order-summary__image--empty'>
									Нет фото
								</div>
							)}
							<div className='order-summary__content'>
								<h3 className='order-summary__name'>
									{item.product.name}
								</h3>
								<p className='order-summary__info'>
									{formatPrice(item.product.final_price)} ×{' '}
									{item.quantity} шт.
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</aside>
	);
};

export default OrderSummary;
