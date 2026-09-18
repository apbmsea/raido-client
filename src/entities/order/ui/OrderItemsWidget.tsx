import { useAppSelector } from '@shared/hooks/store.hooks';
import { formatPrice } from '@shared/utils/formatPrice';
import { useSearchParams } from 'react-router-dom';
import './OrderItemsWidget.scss';

const OrderItemsWidget = () => {
	const [searchParams] = useSearchParams();
	const cartItems = useAppSelector(state => state.cart.items);
	const idsParam = searchParams.get('ids') || '';

	const queryIds = idsParam ? idsParam.split(',') : [];

	const targetItems = cartItems.filter(item =>
		queryIds.includes(item.id.toString())
	);

	const totalCount = targetItems.reduce(
		(sum, item) => sum + item.quantity,
		0
	);
	const totalPrice = targetItems.reduce(
		(sum, item) => sum + Number(item.final_subtotal) * item.quantity,
		0
	);

	return (
		<div className='order-items-widget'>
			<h3 className='order-items-widget__title'>
				Оформляем {totalCount} товаров за {formatPrice(totalPrice)}
			</h3>
			<div className='order-items-widget__list'>
				{targetItems.map(item => (
					<div className='order-items-widget__item' key={item.id}>
						{item.product.images[0].image_88x88 ? (
							<img
								className='order-items-widget__item-image'
								src={item.product.images[0].image_88x88}
								alt=''
							/>
						) : (
							<div className='order-items-widget__item-no-image'>
								Нет фото
							</div>
						)}
						<div className='order-items-widget__item-content'>
							<h4 className='order-items-widget__item-title'>
								{item.product.name}
							</h4>
							<div className='order-items-widget__item-info'>
								<span className='order-items-widget__item-price'>
									{formatPrice(
										Number(item.product.final_price)
									)}
								</span>
								-{' '}
								<span className='order-items-widget__item-quantity'>
									{item.quantity} шт.
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrderItemsWidget;
