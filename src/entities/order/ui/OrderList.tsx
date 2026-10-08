import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { EmptyState } from '@shared/ui/EmptyState';
import { LoadMore } from '@shared/ui/LoadMore';
import { Loader } from '@shared/ui/Loader';
import { actions } from '../model/orderSlice';
import { OrderCard } from './OrderCard';
import './OrderList.scss';

export const OrderList = () => {
	const dispatch = useAppDispatch();
	const { items, isLoading, paging } = useAppSelector(state => state.order);

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

			<LoadMore
				paging={paging}
				onLoadMore={() => dispatch(actions.getOrdersMoreRequest())}
			/>
		</div>
	);
};
