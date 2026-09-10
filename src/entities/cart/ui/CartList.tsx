import { CatalogCard } from '@entities/catalog';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useEffect } from 'react';
import { Cart } from '..';
import './CartList.scss'

export const CartList = () => {
	const dispatch = useAppDispatch();
    const {items } = useAppSelector((state) => state.cart)

	useEffect(() => {
		dispatch(Cart.actions.getCartRequest());
	}, [dispatch]);

	return (
		<div className='cart-list'>
			{items.map(item => (
				<CatalogCard item={item.product} variant='list' />
			))}
		</div>
	);
};
