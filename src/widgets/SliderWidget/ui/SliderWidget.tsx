import { useEffect, useRef, useState } from 'react';
import './SliderWidget.scss';
import slider1 from '@/shared/assets/slider1.png';
import slider2 from '@/shared/assets/slider2.png';
import { Button } from '@shared/ui/Button';
import ArrowRigthIcon from '@shared/icons/ArrowRight';
import { IconButton } from '@shared/ui/IconButton';
import ArrowLeftIcon from '@shared/icons/ArrowLeft';

export const CATALOG_ITEMS = [
	{
		id: '1',
		title: 'Будь в курсе новостей!',
		description: 'Повышение НДС, как работать?',
		button: 'Читать подробнее',
		image: slider1
	},
	{
		id: '2',
		title: 'Программа лояльности',
		description: 'Копи и оплачивай часть покупок баллами — РайдоКоинами',
		button: 'Читать подробнее',
		image: slider2
	}
];

const AUTO_DELAY = 5000;

const SliderWidget = () => {
	const [index, setIndex] = useState(0);
	const timeoutRef = useRef<number | null>(null);
	const touchStartX = useRef(0);

	const itemsCount = CATALOG_ITEMS.length;
	const currentItem = CATALOG_ITEMS[index];

	const nextSlide = () => {
		setIndex(prev => (prev + 1) % itemsCount);
	};

	const prevSlide = () => {
		setIndex(prev => (prev - 1 + itemsCount) % itemsCount);
	};

	useEffect(() => {
		timeoutRef.current = window.setTimeout(nextSlide, AUTO_DELAY);

		return () => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [index]);

	const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
		const deltaX = e.changedTouches[0].clientX - touchStartX.current;
		if (Math.abs(deltaX) > 50) {
			deltaX < 0 ? nextSlide() : prevSlide();
		}
	};

	return (
		<section
			className='slider-widget'
			style={{ backgroundImage: `url(${currentItem.image})` }}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			<div className='slider-widget__content'>
				<h2 className='slider-widget__content-title'>
					{currentItem.title}
				</h2>
				<p className='slider-widget__content-description'>
					{currentItem.description}
				</p>
				<Button
					className='slider-widget__content-button'
					variant='outline'
					rightIcon={<ArrowRigthIcon width={16} height={16} />}
				>
					{currentItem.button}
				</Button>
			</div>

			<div className='slider-widget__controls'>
				<IconButton
					className='slider-widget__controls-button hidden-tablet'
					size={45}
					icon={<ArrowLeftIcon width={24} height={24} />}
					onClick={prevSlide}
				/>
				<span>
					{index + 1} / {itemsCount}
				</span>
				<IconButton
					className='slider-widget__controls-button hidden-tablet'
					size={45}
					icon={<ArrowRigthIcon width={24} height={24} />}
					onClick={nextSlide}
				/>
			</div>
		</section>
	);
};

export default SliderWidget;
