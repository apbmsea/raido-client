import type { CartItem } from '@entities/cart';
import { formatPrice } from '@shared/utils/formatPrice';
import { plural } from '@shared/utils/plural';
import './OrderSummary.scss';

const OrderSummary = ({ items }: { items: CartItem[] }) => {
	const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
	const totalPrice = items.reduce(
		(sum, item) => sum + Number(item.final_subtotal),
		0
	);
	const retailPrice = items.reduce(
		(sum, item) => sum + Number(item.retail_subtotal),
		0
	);
	const discount = retailPrice - totalPrice;

	return (
		<aside className='order-summary'>
			<h2 className='order-summary__title'>Ваш заказ</h2>
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
							<strong className='order-summary__price'>
								{formatPrice(item.final_subtotal)}
							</strong>
						</li>
					);
				})}
			</ul>

			<dl className='order-summary__totals'>
				<div className='order-summary__row'>
					<dt>
						{totalCount}{' '}
						{plural(totalCount, ['товар', 'товара', 'товаров'])}
					</dt>
					<dd>{formatPrice(retailPrice)}</dd>
				</div>
				{discount > 0 && (
					<div className='order-summary__row order-summary__row--discount'>
						<dt>Скидка</dt>
						<dd>−{formatPrice(discount)}</dd>
					</div>
				)}
				<div className='order-summary__row order-summary__row--total'>
					<dt>Итого</dt>
					<dd>{formatPrice(totalPrice)}</dd>
				</div>
			</dl>
		</aside>
	);
};

export default OrderSummary;
