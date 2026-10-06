import { OrderList } from '@entities/order/ui/OrderList';
import './OrdersPage.scss';
import { useOrderCreatedNotice } from '@entities/order';

const OrdersPage = () => {
	const isOrderCreated = useOrderCreatedNotice();

	return (
		<main className='orders-page'>
			{isOrderCreated && (
				<p className='orders-page__thanks' role='status'>
					Спасибо за заказ!
				</p>
			)}
			<header className='orders-page__header'>
				<p className='orders-page__eyebrow'>ЛИЧНЫЙ КАБИНЕТ</p>
				<h1 className='orders-page__title'>Мои заказы</h1>
				<p className='orders-page__description'>
					История покупок и актуальная информация по каждому заказу.
				</p>
			</header>
			<OrderList />
		</main>
	);
};

export default OrdersPage;
