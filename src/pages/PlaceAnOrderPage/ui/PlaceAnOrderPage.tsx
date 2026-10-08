import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthPrompt } from '@features/auth';
import { CheckoutForm } from '@features/checkout';
import { useAppSelector } from '@shared/hooks/store.hooks';
import { EmptyState } from '@shared/ui/EmptyState';
import { Loader } from '@shared/ui/Loader';
import { OrderSummary } from '@widgets/OrderSummary';
import './PlaceAnOrderPage.scss';

const PlaceAnOrderPage = () => {
	const [searchParams] = useSearchParams();
	const { user, isLoading: isUserLoading } = useAppSelector(
		state => state.user
	);
	const { items: cartItems, isLoading: isCartLoading } = useAppSelector(
		state => state.cart
	);

	// Позиции для заказа выбраны в корзине и переданы в адресе: ?ids=1,2,3
	const idsParam = searchParams.get('ids') ?? '';
	const orderItems = useMemo(() => {
		const ids = idsParam.split(',').map(Number).filter(Boolean);
		return cartItems.filter(item => ids.includes(item.id));
	}, [idsParam, cartItems]);

	const renderContent = () => {
		if (isUserLoading) return <Loader />;

		if (!user) {
			return <AuthPrompt message='Войдите в профиль, чтобы оформить заказ' />;
		}

		if (orderItems.length === 0) {
			return isCartLoading ? (
				<Loader />
			) : (
				<EmptyState
					title='Нет товаров для оформления'
					description='Выберите товары в корзине и нажмите «Оформить заказ».'
					action={
						<Link className='place-an-order-page__link' to='/cart'>
							Перейти в корзину
						</Link>
					}
				/>
			);
		}

		return (
			<div className='place-an-order-page__content'>
				<CheckoutForm
					user={user}
					cartItemIds={orderItems.map(item => item.id)}
				/>
				<div className='place-an-order-page__summary'>
					<OrderSummary items={orderItems} />
				</div>
			</div>
		);
	};

	return (
		<main className='place-an-order-page'>
			<h1 className='place-an-order-page__title'>Оформление заказа</h1>
			{renderContent()}
		</main>
	);
};

export default PlaceAnOrderPage;
