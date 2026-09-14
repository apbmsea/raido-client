import { useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';

import './CartWidget.scss';

export const CartWidget = () => {
	const { totalSum } = useAppSelector(state => state.cart);

	return (
		<div className='cart-widget'>
			<div className='cart-widget__inner'>
				<span className='cart-widget__total'>
					{totalSum.toLocaleString('ru-RU')} ₽
				</span>

				<Button>Оформить заказ</Button>
			</div>
		</div>
	);
};
