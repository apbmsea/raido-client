import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { actions } from './orderSlice';

/**
 * Возвращает true только на первой странице, открытой сразу после оформления заказа
 */
export const useOrderCreatedNotice = () => {
	const dispatch = useAppDispatch();
	const isJustCreated = useAppSelector(state => state.order.isJustCreated);
	const [isVisible] = useState(isJustCreated);

	useEffect(() => {
		if (isJustCreated) {
			dispatch(actions.clearJustCreated());
		}
	}, [isJustCreated, dispatch]);

	return isVisible;
};
