import { useEffect, useState } from 'react';
import './AddItemToCartButton.scss';

import { Cart } from '@entities/cart';

import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';

import { Button } from '@shared/ui/Button';
import CartIcon from '@shared/icons/Cart';
import PlusIcon from '@shared/icons/Plus';
import MinusIcon from '@shared/icons/Minus';

type AddItemToCartProps = {
	productId: number;
};

const AddItemToCart = ({ productId }: AddItemToCartProps) => {
	const dispatch = useAppDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const cartItem = useAppSelector(state =>
		state.cart.items.find(item => item.product_id === productId)
	);

	const quantity = cartItem?.quantity ?? 0;
	const isInCart = quantity > 0;

	useEffect(() => {
		if (isLoading) {
			setIsLoading(false);
		}
	}, [cartItem?.quantity]);

	const handleAddToCart = () => {
		setIsLoading(true);

		dispatch(
			Cart.actions.addItemToCartRequest({
				payload: {
					product_id: productId,
					quantity: 1
				}
			})
		);
	};

	const handleIncrease = () => {
		if (!cartItem) return;

		setIsLoading(true);

		dispatch(
			Cart.actions.increaseQuantityRequest({
				product_id: cartItem.id,
				quantity: quantity + 1
			})
		);
	};

	const handleDecrease = () => {
		if (!cartItem) return;

		setIsLoading(true);

		if (quantity === 1) {
			dispatch(
				Cart.actions.removeItemFromCartRequest({
					product_id: cartItem.id
				})
			);

			return;
		}

		dispatch(
			Cart.actions.decreaseQuantityRequest({
				product_id: cartItem.id,
				quantity: quantity - 1
			})
		);
	};

	return (
		<>
			{isInCart ? (
				<Button
					className='btn--counter'
					loading={isLoading}
					leftIcon={
						<span
							className='btn__icon-click-zone'
							onClick={e => {
								e.stopPropagation();
								if (!isLoading) handleDecrease();
							}}
						>
							<MinusIcon size={8} />
						</span>
					}
					rightIcon={
						<span
							className='btn__icon-click-zone'
							onClick={e => {
								e.stopPropagation();
								if (!isLoading) handleIncrease();
							}}
						>
							<PlusIcon size={8} />
						</span>
					}
				>
					{quantity}
				</Button>
			) : (
				<Button
					onClick={handleAddToCart}
					loading={isLoading}
					rightIcon={<CartIcon size={24} />}
				>
					<span>В корзину</span>
				</Button>
			)}
		</>
	);
};

export default AddItemToCart;
