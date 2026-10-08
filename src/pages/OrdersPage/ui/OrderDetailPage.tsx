import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getOrderById, type OrderDetails } from '@entities/order';
import { Loader } from '@shared/ui/Loader';
import { formatDate } from '@shared/utils/formatDate';
import { formatPrice } from '@shared/utils/formatPrice';
import './OrderDetailPage.scss';

type LoadResult = {
	orderId: string;
	order?: OrderDetails;
	isError?: boolean;
};

const OrderDetailPage = () => {
	const { orderId = '' } = useParams();
	const [result, setResult] = useState<LoadResult | null>(null);

	useEffect(() => {
		let isCurrent = true;

		getOrderById(orderId)
			.then(order => {
				if (isCurrent) setResult({ orderId, order });
			})
			.catch(() => {
				if (isCurrent) setResult({ orderId, isError: true });
			});

		return () => {
			isCurrent = false;
		};
	}, [orderId]);

	// Результат относится к заказу, для которого запрашивался: после перехода
	// к другому заказу прежний не показываем
	const currentResult = result?.orderId === orderId ? result : null;

	if (!currentResult) {
		return <Loader text='Загружаем заказ' />;
	}

	const { order } = currentResult;

	if (!order) {
		return (
			<section className='order-detail order-detail--state'>
				<p>Не удалось загрузить заказ. Попробуйте обновить страницу.</p>
				<Link className='order-detail__back' to='/profile/orders'>
					← Все заказы
				</Link>
			</section>
		);
	}

	const managerName = [
		order.manager_surname,
		order.manager_name,
		order.manager_patronymic
	]
		.filter(Boolean)
		.join(' ');

	return (
		<section className='order-detail'>
			<Link className='order-detail__back' to='/profile/orders'>
				← Все заказы
			</Link>

			<header className='order-detail__header'>
				<div>
					<h1 className='order-detail__title'>Заказ №{order.id}</h1>
					<p className='order-detail__date'>
						Оформлен {formatDate(order.created_at, 'dateTime')}
					</p>
				</div>
				<div className='order-detail__statuses'>
					<span
						className={`order-detail__status order-detail__status--${order.status}`}
					>
						{order.status_label}
					</span>
					<span
						className={`order-detail__payment order-detail__payment--${order.payment_status}`}
					>
						{order.payment_status_label}
					</span>
				</div>
			</header>

			<div className='order-detail__layout'>
				<div className='order-detail__main'>
					<section className='order-detail__section'>
						<h2 className='order-detail__section-title'>
							Товары <span>({order.items.length})</span>
						</h2>
						<div className='order-detail__items'>
							{order.items.map(item => (
								<article className='order-detail__item' key={item.id}>
									{item.product_image?.image_250x250 ? (
										<img
											className='order-detail__image'
											src={item.product_image.image_250x250}
											alt=''
											loading='lazy'
										/>
									) : (
										<div className='order-detail__image order-detail__image--empty'>
											Нет фото
										</div>
									)}
									<div className='order-detail__item-description'>
										<h3>
											<Link to={`/product/${item.product_id}`}>
												{item.product_name}
											</Link>
										</h3>
										<p>
											{item.quantity} шт. ×{' '}
											{formatPrice(item.retail_price)}
										</p>
									</div>
									<div className='order-detail__item-price'>
										<strong>
											{formatPrice(item.final_subtotal)}
										</strong>
										{Number(item.final_subtotal) !==
											Number(item.retail_subtotal) && (
											<del>{formatPrice(item.retail_subtotal)}</del>
										)}
									</div>
								</article>
							))}
						</div>
					</section>

					<section className='order-detail__section'>
						<h2 className='order-detail__section-title'>
							{order.shipping ? 'Доставка' : 'Самовывоз'}
						</h2>
						{order.shipping && (
							<p>{order.shipping_address || 'Адрес не указан'}</p>
						)}
						{order.comment && (
							<p className='order-detail__comment'>{order.comment}</p>
						)}
					</section>

					{order.is_organization_order && (
						<section className='order-detail__section'>
							<h2 className='order-detail__section-title'>
								Заказ организации
							</h2>
							<p>{order.organization_name}</p>
							{order.created_by_manager && (
								<div className='order-detail__manager'>
									<strong>{managerName || order.manager_email}</strong>
									{managerName && <span>{order.manager_email}</span>}
								</div>
							)}
						</section>
					)}
				</div>

				<aside className='order-detail__summary'>
					<h2 className='order-detail__section-title'>Сумма заказа</h2>
					<div className='order-detail__sum-row'>
						<span>Розничная стоимость</span>
						<span>{formatPrice(order.retail_subtotal)}</span>
					</div>
					<div className='order-detail__sum-row'>
						<span>Итоговая стоимость</span>
						<span>{formatPrice(order.final_subtotal)}</span>
					</div>
					<div className='order-detail__total'>
						<span>Итого</span>
						<strong>{formatPrice(order.total_amount)}</strong>
					</div>
					{order.receipt_code && (
						<p className='order-detail__note'>
							Код заказа <strong>{order.receipt_code}</strong>
						</p>
					)}
					{order.support_phone && (
						<p className='order-detail__note'>
							Вопросы по заказу:{' '}
							<a href={`tel:${order.support_phone}`}>
								{order.support_phone}
							</a>
						</p>
					)}
				</aside>
			</div>
		</section>
	);
};

export default OrderDetailPage;
