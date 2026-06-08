import { useAppSelector } from '@shared/hooks/store.hooks';
import './ProductFeatures.scss';

const ProductFeatures = () => {
	const properties = useAppSelector(state => state.product.item?.properties);
	
	return (
		<div className='product-features'>
			<h4 className='product-features__title'>Общие характеристики</h4>
			<div className='product-features__list'>
				{properties?.map(prop => (
					<div key={prop.name} className='product-features__row'>
						<span className='product-features__name'>{prop.name}</span>
						<span className='product-features__value'>
							{prop.value}{' '}
							{prop.unit === 'Не указана' ? '' : prop.unit}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductFeatures;