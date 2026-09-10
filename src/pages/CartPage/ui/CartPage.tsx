import { CartList } from '@entities/cart';
import './CartPage.scss';

const CartPage = () => {
	return (
		<main className='cart-page'>
      <h1>Корзина</h1>
			<section className='cart-page__main'>
        <CartList />
        <div>1</div>
      </section>
		</main>
	);
};

export default CartPage;
