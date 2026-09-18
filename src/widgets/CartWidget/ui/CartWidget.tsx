import { useNavigate } from 'react-router-dom'; // Импортируем хук для навигации
import { useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';

import './CartWidget.scss';

export const CartWidget = () => {
	const navigate = useNavigate();

	// Достаем из стора общую сумму и массив выбранных элементов
	// Примечание: убедитесь, что в вашем редьюсере cart сохраняется поле selectedItems,
	// которое вы диспатчите из CartList.
	const { totalSum, selectedItems } = useAppSelector(state => state.cart);

	const handleCheckout = () => {
		if (!selectedItems || selectedItems.length === 0) return;

		// Собираем id продуктов в строку через запятую: "1,2,3"
		const productIds = selectedItems.map(item => item.id).join(',');

		// Переходим на страницу оформления с query-параметрами
		navigate(`/place-an-order?ids=${productIds}`);
	};

	return (
		<div className='cart-widget'>
			<div className='cart-widget__inner'>
				<span className='cart-widget__total'>
					{totalSum.toLocaleString('ru-RU')} ₽
				</span>

				{/* Кнопка активна только если выбрано что-то */}
				<Button
					onClick={handleCheckout}
					disabled={!selectedItems || selectedItems.length === 0}
				>
					Оформить заказ
				</Button>
			</div>
		</div>
	);
};
