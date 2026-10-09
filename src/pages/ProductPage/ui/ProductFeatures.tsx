import type { ProductProperty } from '@entities/product';
import ListViewIcon from '@shared/icons/ListView';
import { EmptyState } from '@shared/ui/EmptyState';
import { hasInfo } from '@shared/utils/hasInfo';
import './ProductFeatures.scss';

const ProductFeatures = ({ properties }: { properties: ProductProperty[] }) => {
	const filledProperties = properties.filter(property =>
		hasInfo(property.value)
	);

	if (filledProperties.length === 0) {
		return (
			<EmptyState
				icon={<ListViewIcon size={40} />}
				title='Характеристики пока не заполнены'
				description='Мы добавим их в ближайшее время. Уточнить детали можно во вкладке «Вопросы».'
			/>
		);
	}

	return (
		<div className='product-features'>
			<h3 className='product-features__title'>Общие характеристики</h3>
			<dl className='product-features__list'>
				{filledProperties.map(property => (
					<div key={property.name} className='product-features__row'>
						<dt className='product-features__name'>
							{property.name}
						</dt>
						<dd className='product-features__value'>
							{property.value}
							{hasInfo(property.unit) ? ` ${property.unit}` : ''}
						</dd>
					</div>
				))}
			</dl>
		</div>
	);
};

export default ProductFeatures;
