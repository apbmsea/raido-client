import { useEffect, useRef, useState, type TouchEvent } from 'react';
import clsx from 'clsx';
import ArrowLeftIcon from '@shared/icons/ArrowLeft';
import ArrowRightIcon from '@shared/icons/ArrowRight';
import { Button } from '@shared/ui/Button';
import { IconButton } from '@shared/ui/IconButton';
import { SLIDES } from '../model/slides';
import './SliderWidget.scss';

const AUTO_DELAY = 5000;
const SWIPE_THRESHOLD = 50;

const SliderWidget = () => {
	const [index, setIndex] = useState(0);
	const touchStartX = useRef(0);

	const slidesCount = SLIDES.length;
	const currentSlide = SLIDES[index];

	const showNext = () => setIndex(prev => (prev + 1) % slidesCount);
	const showPrev = () =>
		setIndex(prev => (prev - 1 + slidesCount) % slidesCount);

	// Таймер перезапускается при каждой смене слайда, в том числе ручной
	useEffect(() => {
		const timer = setTimeout(
			() => setIndex(prev => (prev + 1) % slidesCount),
			AUTO_DELAY
		);

		return () => clearTimeout(timer);
	}, [index, slidesCount]);

	const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = (e: TouchEvent<HTMLElement>) => {
		const deltaX = e.changedTouches[0].clientX - touchStartX.current;

		if (deltaX < -SWIPE_THRESHOLD) showNext();
		if (deltaX > SWIPE_THRESHOLD) showPrev();
	};

	return (
		<section
			className='slider-widget'
			aria-roledescription='карусель'
			aria-label='Новости и акции'
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
		>
			{/* Фоны лежат стопкой и сменяются плавным проявлением */}
			{SLIDES.map((slide, slideIndex) => (
				<img
					key={slide.id}
					className={clsx(
						'slider-widget__background',
						slideIndex === index && 'slider-widget__background--active'
					)}
					src={slide.image}
					alt=''
					loading={slideIndex === 0 ? 'eager' : 'lazy'}
				/>
			))}

			<div className='slider-widget__content' key={currentSlide.id}>
				<h2 className='slider-widget__title'>{currentSlide.title}</h2>
				<p className='slider-widget__description'>
					{currentSlide.description}
				</p>
				<Button
					className='slider-widget__button'
					variant='outline'
					rightIcon={<ArrowRightIcon size={16} />}
				>
					{currentSlide.button}
				</Button>
			</div>

			<div className='slider-widget__controls'>
				<IconButton
					className='hidden-tablet'
					variant='ghost'
					size='m'
					icon={<ArrowLeftIcon />}
					onClick={showPrev}
					aria-label='Предыдущий слайд'
				/>
				<span aria-live='polite'>
					{index + 1} / {slidesCount}
				</span>
				<IconButton
					className='hidden-tablet'
					variant='ghost'
					size='m'
					icon={<ArrowRightIcon />}
					onClick={showNext}
					aria-label='Следующий слайд'
				/>
			</div>
		</section>
	);
};

export default SliderWidget;
