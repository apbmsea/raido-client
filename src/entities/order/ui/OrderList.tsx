import { useAppSelector } from '@shared/hooks/store.hooks';
import { EmptyState } from '@shared/ui/EmptyState';
import { Loader } from '@shared/ui/Loader';
import { OrderCard } from './OrderCard';
import './OrderList.scss';

export const OrderList = () => {
	const { items, isLoading } = useAppSelector(state => state.order);

	if (isLoading && items.length === 0) {
		return <Loader text='Загружаем заказы' />;
	}

	if (items.length === 0) {
		return (
			<EmptyState
				title='У вас пока нет заказов'
				description='Здесь появится история покупок после первого оформленного заказа.'
			/>
		);
	}

	return (
		<div className='order-list'>
			{items.map(item => (
				<OrderCard key={item.id} item={item} />
			))}
		</div>
	);
};
