import { useEffect, useMemo, useState } from 'react';
import { CatalogCard } from '@entities/catalog';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Loader } from '@shared/ui/Loader';
import { Cart } from '..';
import { Checkbox } from '@shared/ui/Checkbox';

import './CartList.scss';

export const CartList = () => {
	const dispatch = useAppDispatch();

	const { items, isLoading } = useAppSelector(state => state.cart);

	const [selectedIds, setSelectedIds] = useState<number[]>([]);

	useEffect(() => {
		dispatch(Cart.actions.getCartRequest());
	}, [dispatch]);

	useEffect(() => {
		setSelectedIds(items.map(item => item.product_id));
	}, [items]);

	const selectedItems = useMemo(() => {
		return items.filter(item => selectedIds.includes(item.product_id));
	}, [items, selectedIds]);

	const total = useMemo(() => {
		return selectedItems.reduce(
			(sum, item) => sum + Number(item.final_subtotal),
			0
		);
	}, [selectedItems]);

	const isAllSelected =
		items.length > 0 && selectedIds.length === items.length;

	const handleToggleItem = (productId: number) => {
		setSelectedIds(prev => {
			if (prev.includes(productId)) {
				return prev.filter(id => id !== productId);
			}

			return [...prev, productId];
		});
	};

	const handleToggleAll = () => {
		setSelectedIds(isAllSelected ? [] : items.map(item => item.product_id));
	};

	useEffect(() => {
		dispatch(
			Cart.actions.setSelectedItems({
				selectedItems,
				totalSum: total,
				totalSelectedItems: selectedItems.length
			})
		);
	}, [selectedItems, total, dispatch]);

	if (isLoading) {
		return <Loader />;
	}

	if (items.length === 0)
		return (
			<div className='cart-null'>
				<img className='cart-null__image' src='./cart.png' alt='' />
				<span className='cart-null__text'>
					В корзине пока нет товаров
				</span>
			</div>
		);

	return (
		<div className='cart-list'>
			<div className='cart-list__header'>
				<Checkbox
					label='Выбрать все товары'
					checked={isAllSelected}
					onChange={handleToggleAll}
				/>
			</div>

			<div className='cart-list__items'>
				{items.map(item => {
					const isSelected = selectedIds.includes(item.product_id);

					return (
						<div className='cart-list__item' key={item.id}>
							<Checkbox
								label=''
								checked={isSelected}
								onChange={() =>
									handleToggleItem(item.product_id)
								}
								className='cart-list__checkbox'
							/>

							<CatalogCard item={item.product} variant='list' />
						</div>
					);
				})}
			</div>
		</div>
	);
};
