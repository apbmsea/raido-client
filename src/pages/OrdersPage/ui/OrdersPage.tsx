import { OrderList } from '@entities/order/ui/OrderList';
import './OrdersPage.scss';

const OrdersPage = () => {
	return (
		<main className='orders-page'>
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
