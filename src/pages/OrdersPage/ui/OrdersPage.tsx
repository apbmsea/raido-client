import { useEffect } from 'react';
import { Order, OrderList } from '@entities/order';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import './OrdersPage.scss';

const OrdersPage = () => {
	usePageTitle('Мои заказы');

	const dispatch = useAppDispatch();

	// Статусы заказов меняются на сервере — обновляем список при каждом открытии
	useEffect(() => {
		dispatch(Order.actions.getOrdersRequest());
	}, [dispatch]);

	return (
		<section className='orders-page'>
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
