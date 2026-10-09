import { useEffect } from 'react';
import { Cart } from '@entities/cart';
import { AuthPrompt } from '@features/auth';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Loader } from '@shared/ui/Loader';
import { CartList } from '@widgets/CartList';
import { CartWidget } from '@widgets/CartWidget';
import { OffersWidget } from '@widgets/OffersWidget';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import './CartPage.scss';

const CartPage = () => {
	usePageTitle('Корзина');

	const dispatch = useAppDispatch();
	const { isLogin, isLoading } = useAppSelector(state => state.user);

	useEffect(() => {
		if (isLogin) dispatch(Cart.actions.getCartRequest());
	}, [isLogin, dispatch]);

	return (
		<main className='cart-page'>
			<h1 className='cart-page__title'>Корзина</h1>

			{isLoading ? (
				<Loader />
			) : isLogin ? (
				<div className='cart-page__main'>
					<CartList />
					<CartWidget />
				</div>
			) : (
				<AuthPrompt message='Войдите в профиль, чтобы собрать корзину' />
			)}

			<OffersWidget />
		</main>
	);
};

export default CartPage;
