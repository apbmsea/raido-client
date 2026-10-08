import { useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Cart } from '@entities/cart';
import { AuthPrompt } from '@features/auth';
import { CheckoutForm } from '@features/checkout';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { EmptyState } from '@shared/ui/EmptyState';
import { Loader } from '@shared/ui/Loader';
import { hasNextPage } from '@shared/utils/pagination';
import { OrderSummary } from '@widgets/OrderSummary';
import './PlaceAnOrderPage.scss';

const PlaceAnOrderPage = () => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const { user, isLoading: isUserLoading } = useAppSelector(
		state => state.user
	);
	const {
		items: cartItems,
		isLoading: isCartLoading,
		paging
	} = useAppSelector(state => state.cart);

	// Позиции для заказа выбраны в корзине и переданы в адресе: ?ids=1,2,3
	const idsParam = searchParams.get('ids') ?? '';
	const orderIds = useMemo(
		() => idsParam.split(',').map(Number).filter(Boolean),
		[idsParam]
	);
	const orderItems = useMemo(
		() => cartItems.filter(item => orderIds.includes(item.id)),
		[orderIds, cartItems]
	);

	// Корзина приходит постранично: дочитываем её, пока не найдутся все позиции
	// заказа, иначе после перезагрузки страницы часть товаров молча выпала бы
	const isSearchingItems =
		orderItems.length < orderIds.length &&
		hasNextPage(paging) &&
		!paging.isLoadMoreError;

	useEffect(() => {
		if (isSearchingItems && !isCartLoading && !paging.isLoadingMore) {
			dispatch(Cart.actions.getCartMoreRequest());
		}
	}, [dispatch, isSearchingItems, isCartLoading, paging.isLoadingMore]);

	const renderContent = () => {
		if (isUserLoading || isSearchingItems) return <Loader />;

		if (!user) {
			return (
				<AuthPrompt message='Войдите в профиль, чтобы оформить заказ' />
			);
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
			<header className='place-an-order-page__header'>
				<Link className='place-an-order-page__back' to='/cart'>
					← Вернуться в корзину
				</Link>
				<h1 className='place-an-order-page__title'>
					Оформление заказа
				</h1>
				<p className='place-an-order-page__lead'>
					Проверьте данные и выберите, как получить заказ.
				</p>
			</header>
			{renderContent()}
		</main>
	);
};

export default PlaceAnOrderPage;
