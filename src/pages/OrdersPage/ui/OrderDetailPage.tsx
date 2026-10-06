import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useOrderCreatedNotice } from '@entities/order';
import { getOrderById } from '@entities/order/model/orderApi';
import type { OrderDetails } from '@entities/order/model/orderTypes';
import { formatPrice } from '@shared/utils/formatPrice';
import './OrderDetailPage.scss';

const formatOrderDate = (date: string) => {
	const parsedDate = new Date(date);
	if (Number.isNaN(parsedDate.getTime())) return date;

	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(parsedDate);
};

const OrderDetailPage = () => {
	const { orderId = '' } = useParams();
	const isOrderCreated = useOrderCreatedNotice();
	const [result, setResult] = useState<{
		orderId: string;
		order?: OrderDetails;
		error?: string;
	} | null>(null);

	useEffect(() => {
		let isCurrent = true;

		getOrderById(orderId)
			.then(data => {
				if (isCurrent) setResult({ orderId, order: data });
			})
			.catch(() => {
				if (isCurrent) {
					setResult({
						orderId,
						error:
							'Не удалось загрузить заказ. Попробуйте обновить страницу.'
					});
				}
			});

		return () => {
			isCurrent = false;
		};
	}, [orderId]);

	const order = result?.orderId === orderId ? result.order : null;
	const error = result?.orderId === orderId ? result.error : undefined;

	if (!order && !error) {
		return (
			<main className='order-detail order-detail--state'>
				<p>Загружаем заказ...</p>
			</main>
		);
	}

	if (error || !order) {
		return (
			<main className='order-detail order-detail--state'>
				<p>{error || 'Заказ не найден.'}</p>
				<Link className='order-detail__back' to='/profile/orders'>
					К списку заказов
				</Link>
			</main>
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
		<main className='order-detail'>
			<Link className='order-detail__back' to='/profile/orders'>
				← Все заказы
			</Link>

			{isOrderCreated && (
				<div className='order-detail__thanks' role='status'>
					<strong>Спасибо за заказ!</strong>
					<span>
						Заказ №{order.id} оформлен. Следить за его статусом
						можно на этой странице.
					</span>
				</div>
			)}

			<header className='order-detail__header'>
				<div>
					<p className='order-detail__eyebrow'>ЗАКАЗ №{order.id}</p>
					<h1 className='order-detail__title'>Детали заказа</h1>
					<p className='order-detail__date'>
						Оформлен {formatOrderDate(order.created_at)}
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
								<article
									className='order-detail__item'
									key={item.id}
								>
									{item.product_image?.image_250x250 ? (
										<img
											className='order-detail__image'
											src={item.product_image.image_250x250}
											alt={item.product_name}
										/>
									) : (
										<div className='order-detail__image order-detail__image--empty'>
											Нет фото
										</div>
									)}
									<div className='order-detail__item-description'>
										<h3>{item.product_name}</h3>
										<p>
											{item.quantity} шт. ×{' '}
											{formatPrice(Number(item.retail_price))}
										</p>
									</div>
									<div className='order-detail__item-price'>
										<strong>
											{formatPrice(Number(item.final_subtotal))}
										</strong>
										{Number(item.final_subtotal) !==
											Number(item.retail_subtotal) && (
											<del>
												{formatPrice(Number(item.retail_subtotal))}
											</del>
										)}
									</div>
								</article>
							))}
						</div>
					</section>

					<section className='order-detail__section order-detail__fulfillment'>
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
									<strong>
										{managerName || order.manager_email}
									</strong>
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
						<span>{formatPrice(Number(order.retail_subtotal))}</span>
					</div>
					<div className='order-detail__sum-row'>
						<span>Итоговая стоимость</span>
						<span>{formatPrice(Number(order.final_subtotal))}</span>
					</div>
					<div className='order-detail__total'>
						<span>Итого</span>
						<strong>{formatPrice(Number(order.total_amount))}</strong>
					</div>
					{order.receipt_code && (
						<p className='order-detail__receipt'>
							Код заказа <strong>{order.receipt_code}</strong>
						</p>
					)}
					{order.support_phone && (
						<p className='order-detail__support'>
							Вопросы по заказу:{' '}
							<a href={`tel:${order.support_phone}`}>
								{order.support_phone}
							</a>
						</p>
					)}
				</aside>
			</div>
		</main>
	);
};

export default OrderDetailPage;