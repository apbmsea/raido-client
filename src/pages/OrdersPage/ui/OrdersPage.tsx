import { useEffect } from 'react';
import { Order, OrderList, useOrderCreatedNotice } from '@entities/order';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import './OrdersPage.scss';

const OrdersPage = () => {
	const dispatch = useAppDispatch();
	const isOrderCreated = useOrderCreatedNotice();

	// Статусы заказов меняются на сервере — обновляем список при каждом открытии
	useEffect(() => {
		dispatch(Order.actions.getOrdersRequest());
	}, [dispatch]);

	return (
		<section className='orders-page'>
			{isOrderCreated && (
				<p className='orders-page__thanks' role='status'>
					Спасибо за заказ!
				</p>
			)}
			<header className='orders-page__header'>
				<h1 className='orders-page__title'>Мои заказы</h1>
				<p className='orders-page__description'>
					История покупок и актуальная информация по каждому заказу.
				</p>
			</header>
			<OrderList />
		</section>
	);
};

export default OrdersPage;
