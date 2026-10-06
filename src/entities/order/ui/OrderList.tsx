import { useAppSelector } from '@shared/hooks/store.hooks';
import { OrderCard } from './OrderCard';
import './OrderList.scss'

export const OrderList = () => {
	const { items, isLoading } = useAppSelector(state => state.order);

	if (isLoading) {
		return <p className='order-list__message'>Загружаем заказы...</p>;
	}

	if (!items.length) {
		return <p className='order-list__message'>У вас пока нет заказов.</p>;
	}

	return (
		<div className='order-list'>
			{items.map(item => (
				<OrderCard key={item.id} item={item} />
			))}
		</div>
	);
};
