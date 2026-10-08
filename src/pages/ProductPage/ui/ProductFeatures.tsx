import type { ProductProperty } from '@entities/product';
import ListViewIcon from '@shared/icons/ListView';
import { EmptyState } from '@shared/ui/EmptyState';
import './ProductFeatures.scss';

// Так сервер помечает характеристику без единицы измерения
const NO_UNIT = 'Не указана';

const ProductFeatures = ({ properties }: { properties: ProductProperty[] }) => {
	if (properties.length === 0) {
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
				{properties.map(property => (
					<div key={property.name} className='product-features__row'>
						<dt className='product-features__name'>
							{property.name}
						</dt>
						<dd className='product-features__value'>
							{property.value}
							{property.unit && property.unit !== NO_UNIT
								? ` ${property.unit}`
								: ''}
						</dd>
					</div>
				))}
			</dl>
		</div>
	);
};

export default ProductFeatures;
