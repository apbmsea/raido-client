import { useNavigate } from 'react-router-dom';
import { Modal } from '@entities/modal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import './OrderCreatedWindow.scss';

const OrderCreatedWindow = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const orderId = useAppSelector(state => state.order.createdOrderId);

	const close = () => dispatch(Modal.actions.closeModal());

	return (
		<div className='modal-form order-created'>
			<span className='order-created__mark' aria-hidden='true'>
				<svg viewBox='0 0 24 24' fill='none'>
					<path
						d='M5 12.5l4.5 4.5L19 7.5'
						stroke='currentColor'
						strokeWidth='2.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</span>
			<h2 className='modal-form__title order-created__title'>
				Спасибо за заказ!
			</h2>
			<p className='modal-form__text'>
				{orderId ? `Заказ №${orderId} оформлен.` : 'Заказ оформлен.'}{' '}
				Следить за его статусом можно в разделе «Мои заказы».
			</p>
			<div className='modal-form__buttons'>
				{orderId && (
					<Button
						variant='outline'
						onClick={() => {
							close();
							navigate(`/profile/orders/${orderId}`);
						}}
					>
						Открыть заказ
					</Button>
				)}
				<Button onClick={close}>Хорошо</Button>
			</div>
		</div>
	);
};

export default OrderCreatedWindow;
