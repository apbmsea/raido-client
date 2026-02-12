import './Advantages.scss';
import advantage1 from '@/shared/assets/advantage1.png';
import advantage2 from '@/shared/assets/advantage2.png';
import advantage3 from '@/shared/assets/advantage3.png';
import advantage4 from '@/shared/assets/advantage4.png';

export const ADVANTAGES_ITEMS = [
	{
		id: '1',
		title: 'Широкий выбор',
		description: 'Товары от ведущих брендов: новинки и популярные модели',
		image: advantage1,
		variant: 'lilak'
	},
	{
		id: '2',
		title: 'Низкая цена',
		description: 'Конкурентоспособные цены на весь ассортимент товаров',
		image: advantage2,
		variant: 'white'
	},
	{
		id: '3',
		title: 'Высокое качество',
		description: 'Каждый товар соответствует высоким стандартам качества',
		image: advantage3,
		variant: 'blue'
	},
	{
		id: '4',
		title: 'Бонусная система',
		description: 'Баллами можно оплатить до 50% стоимости заказа',
		image: advantage4,
		variant: 'lilak'
	}
];

const Advantages = () => {
	return (
		<section className='advantages'>
			<h1 className='advantages__title'>Наши преимущества</h1>

			<div className='advantages__items'>
				{ADVANTAGES_ITEMS.map(item => (
					<div
						key={item.id}
						className={`advantages__item advantages__item--${item.variant}`}
					>
						<div className='advantages__text'>
							<h2 className='advantages__item-title'>
								{item.title}
							</h2>

							<p className='advantages__item-description'>
								{item.description}
							</p>
						</div>

						<div className='advantages__content'>
							<img
								className='advantages__content-image'
								src={`./src/shared/assets/${item.image}`}
								alt=''
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Advantages;
