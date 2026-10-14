import { ADVANTAGES_ITEMS } from '../model/advantages';
import { AppImage } from '@shared/ui/AppImage';
import './Advantages.scss';

const Advantages = () => {
	return (
		<section className='advantages'>
			<h2 className='advantages__title'>Наши преимущества</h2>

			<div className='advantages__items'>
				{ADVANTAGES_ITEMS.map(item => (
					<div
						key={item.id}
						className={`advantages__item advantages__item--${item.variant}`}
					>
						<div className='advantages__text'>
							<h3 className='advantages__item-title'>{item.title}</h3>
							<p className='advantages__item-description'>
								{item.description}
							</p>
						</div>

						<AppImage
							className='advantages__image'
							src={item.image}
							alt=''
							loading='lazy'
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default Advantages;
