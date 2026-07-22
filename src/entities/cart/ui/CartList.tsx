import { CatalogCard } from '@entities/catalog';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import React, { useEffect } from 'react';
import { Cart } from '..';

export const CartList = () => {
	const dispatch = useAppDispatch();
    const {items } = useAppSelector((state) => state.cart)

	useEffect(() => {
		dispatch(Cart.actions.getCartRequest());
	}, [dispatch]);

	return (
		<div>
			{/* {items.map(item => (
				<CatalogCard item={item} variant='list' />
			))} */}
		</div>
	);
};
