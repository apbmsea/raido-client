import { useParams } from 'react-router-dom';
import './ProductPage.scss';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Product } from '..';

const ProductPage = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const item = useAppSelector(state => state.product.item);

	useEffect(() => {
		if (id) {
			dispatch(Product.actions.productRequest({ id }));
		}
		console.log('1')
	}, []);

	if (!item) {
		return <main className='product-page'>Загрузка...</main>;
	}

	return (
		<main className='product-page'>
			<h2>{item.name}</h2>
		</main>
	);
};

export default ProductPage;
