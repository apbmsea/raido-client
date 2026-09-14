import { CartList } from '@entities/cart';
import './CartPage.scss';
import { OffersWidget } from '@widgets/OffersWidget';
import { CartWidget } from '@widgets/CartWidget';

const CartPage = () => {
	return (
		<main className='cart-page'>
			<h1>Корзина</h1>
			<section className='cart-page__main'>
				<CartList />
			</section>
			<OffersWidget />
			<CartWidget />
		</main>
	);
};

export default CartPage;
