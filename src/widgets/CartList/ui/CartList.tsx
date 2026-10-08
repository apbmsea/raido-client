import { Link } from 'react-router-dom';
import { Cart } from '@entities/cart';
import { ProductCard } from '@entities/product';
import { AddToCartButton } from '@features/addToCart';
import { FavoriteButton } from '@features/toggleFavorite';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Checkbox } from '@shared/ui/Checkbox';
import { EmptyState } from '@shared/ui/EmptyState';
import { LoadMore } from '@shared/ui/LoadMore';
import { Loader } from '@shared/ui/Loader';
import './CartList.scss';

const CartList = () => {
	const dispatch = useAppDispatch();
	const { items, isLoading, paging, excludedProductIds } = useAppSelector(
		state => state.cart
	);

	if (isLoading && items.length === 0) return <Loader />;

	if (items.length === 0) {
		return (
			<EmptyState
				image='/cart.png'
				title='В корзине пока нет товаров'
				action={
					<Link className='cart-list__link' to='/'>
						Перейти к покупкам
					</Link>
				}
			/>
		);
	}

	return (
		<div className='cart-list'>
			<Checkbox
				label='Выбрать все товары'
				checked={excludedProductIds.length === 0}
				onChange={e =>
					dispatch(Cart.actions.setAllSelected(e.target.checked))
				}
			/>

			<div className='cart-list__items'>
				{items.map(item => (
					<div className='cart-list__item' key={item.id}>
						<Checkbox
							aria-label={`Выбрать «${item.product.name}»`}
							checked={!excludedProductIds.includes(item.product_id)}
							onChange={() =>
								dispatch(
									Cart.actions.toggleItemSelection(item.product_id)
								)
							}
						/>

						<ProductCard
							item={item.product}
							variant='list'
							cartAction={
								<AddToCartButton productId={item.product_id} />
							}
							favoriteAction={
								<FavoriteButton productId={item.product_id} />
							}
						/>
					</div>
				))}
			</div>

			<LoadMore
				paging={paging}
				onLoadMore={() => dispatch(Cart.actions.getCartMoreRequest())}
			/>
		</div>
	);
};

export default CartList;
