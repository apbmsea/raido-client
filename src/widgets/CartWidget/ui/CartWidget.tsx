import { useNavigate } from 'react-router-dom';
import { selectSelectedCartItems, selectSelectedCartTotal } from '@entities/cart';
import { useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { formatPrice } from '@shared/utils/formatPrice';
import { plural } from '@shared/utils/plural';
import './CartWidget.scss';

export const CartWidget = () => {
	const navigate = useNavigate();
	const hasItems = useAppSelector(state => state.cart.items.length > 0);
	const selectedItems = useAppSelector(selectSelectedCartItems);
	const total = useAppSelector(selectSelectedCartTotal);

	if (!hasItems) return null;

	const selectedCount = selectedItems.length;

	const handleCheckout = () => {
		const ids = selectedItems.map(item => item.id).join(',');
		navigate(`/place-an-order?ids=${ids}`);
	};

	return (
		<div className='cart-widget'>
			<div className='cart-widget__inner'>
				<div className='cart-widget__summary'>
					<span className='cart-widget__count'>
						{selectedCount > 0
							? `${selectedCount} ${plural(selectedCount, ['товар', 'товара', 'товаров'])}`
							: 'Товары не выбраны'}
					</span>
					<span className='cart-widget__total'>{formatPrice(total)}</span>
				</div>

				<Button
					size='l'
					onClick={handleCheckout}
					disabled={selectedCount === 0}
				>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
