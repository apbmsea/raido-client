import clsx from 'clsx';
import {
	Cart,
	selectCartItemByProductId,
	selectIsCartProductPending
} from '@entities/cart';
import { Modal } from '@entities/modal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import CartIcon from '@shared/icons/Cart';
import MinusIcon from '@shared/icons/Minus';
import PlusIcon from '@shared/icons/Plus';
import { Button } from '@shared/ui/Button';
import './AddToCartButton.scss';

type AddToCartButtonProps = {
	productId: number;
	size?: 'm' | 'l';
};

/**
 * Кнопка «В корзину», которая превращается в счётчик количества,
 * когда товар уже лежит в корзине
 */
const AddToCartButton = ({ productId, size = 'm' }: AddToCartButtonProps) => {
	const dispatch = useAppDispatch();
	const isLogin = useAppSelector(state => state.user.isLogin);
	const cartItem = useAppSelector(selectCartItemByProductId(productId));
	const isPending = useAppSelector(selectIsCartProductPending(productId));

	const handleAdd = () => {
		// Корзина хранится в аккаунте, поэтому гостю сначала предлагаем войти
		if (!isLogin) {
			dispatch(Modal.actions.openModal('login'));
			return;
		}

		dispatch(Cart.actions.addItemRequest({ productId }));
	};

	if (!cartItem) {
		return (
			<Button
				size={size}
				onClick={handleAdd}
				loading={isPending}
				rightIcon={<CartIcon size={22} />}
			>
				В корзину
			</Button>
		);
	}

	const { id: itemId, quantity } = cartItem;

	const handleDecrease = () => {
		dispatch(
			quantity <= 1
				? Cart.actions.removeItemRequest({ itemId, productId })
				: Cart.actions.changeQuantityRequest({
						itemId,
						productId,
						quantity: quantity - 1
					})
		);
	};

	const handleIncrease = () => {
		dispatch(
			Cart.actions.changeQuantityRequest({
				itemId,
				productId,
				quantity: quantity + 1
			})
		);
	};

	return (
		<div
			className={clsx(
				'cart-stepper',
				`cart-stepper--${size}`,
				isPending && 'cart-stepper--pending'
			)}
			role='group'
			aria-label='Количество в корзине'
		>
			<button
				type='button'
				className='cart-stepper__button'
				onClick={handleDecrease}
				disabled={isPending}
				aria-label={
					quantity <= 1 ? 'Убрать из корзины' : 'Уменьшить количество'
				}
			>
				<MinusIcon size={10} />
			</button>
			<span className='cart-stepper__count' aria-live='polite'>
				{isPending ? <span className='cart-stepper__spinner' /> : quantity}
			</span>
			<button
				type='button'
				className='cart-stepper__button'
				onClick={handleIncrease}
				disabled={isPending}
				aria-label='Увеличить количество'
			>
				<PlusIcon size={10} />
			</button>
		</div>
	);
};

export default AddToCartButton;
