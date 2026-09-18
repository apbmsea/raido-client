import { useAppSelector } from '@shared/hooks/store.hooks';
import { OrderCard } from './OrderCard';
import './OrderList.scss'

export const OrderList = () => {
	const { items } = useAppSelector(state => state.order);

	return (
		<div className='order-list'>
			{items.map(item => (
				<OrderCard key={item.id} item={item} />
			))}
		</div>
	);
};
