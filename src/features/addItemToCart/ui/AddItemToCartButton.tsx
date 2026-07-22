import { Cart } from '@entities/cart';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';

type AddItemToCartProps = {
	productId: string | number; // тип зависит от вашей модели Product
};

const AddItemToCart = ({ productId }: AddItemToCartProps) => {
	const dispatch = useAppDispatch();

	const handleAddToCart = () => {
		// Передаем id в экшен корзины и диспатчим его
		dispatch(
			Cart.actions.addItemToCartRequest({
				payload: {
					product_id: Number(productId),
					quantity: 1
				}
			})
		);
	};

	return <Button onClick={handleAddToCart}>AddItemToCart</Button>;
};

export default AddItemToCart;
