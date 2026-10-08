import { useRef, useState, type MouseEvent } from 'react';
import clsx from 'clsx';
import './ImageSlider.scss';

type ImageSliderProps = {
	images: { image_250x250?: string }[];
	alt?: string;
	className?: string;
};

/**
 * Слайдер на нативной прокрутке со snap-точками: на тач-экранах листается
 * свайпом, на десктопе — движением курсора вдоль картинки
 */
const ImageSlider = ({ images, alt = '', className }: ImageSliderProps) => {
	const [current, setCurrent] = useState(0);
	const trackRef = useRef<HTMLDivElement>(null);

	const scrollToSlide = (index: number) => {
		const track = trackRef.current;
		if (!track) return;

		track.scrollTo({ left: index * track.clientWidth, behavior: 'instant' });
	};

	const handleScroll = () => {
		const track = trackRef.current;
		if (!track || track.clientWidth === 0) return;

		setCurrent(Math.round(track.scrollLeft / track.clientWidth));
	};

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (images.length < 2) return;

		const { left, width } = e.currentTarget.getBoundingClientRect();
		const index = Math.min(
			images.length - 1,
			Math.max(0, Math.floor(((e.clientX - left) / width) * images.length))
		);

		if (index !== current) scrollToSlide(index);
	};

	return (
		<div className={clsx('image-slider', className)}>
			{images.length === 0 ? (
				<div className='image-slider__placeholder'>Нет фото</div>
			) : (
				<div
					className='image-slider__track'
					ref={trackRef}
					onScroll={handleScroll}
					onMouseMove={handleMouseMove}
					onMouseLeave={() => scrollToSlide(0)}
				>
					{images.map((img, i) => (
						<div key={i} className='image-slider__slide'>
							<img
								src={img.image_250x250}
								alt={i === 0 ? alt : ''}
								loading='lazy'
								draggable={false}
							/>
						</div>
					))}
				</div>
			)}

			{images.length > 1 && (
				<div className='image-slider__dots' aria-hidden='true'>
					{images.map((_, i) => (
						<span
							key={i}
							className={clsx(
								'image-slider__dot',
								i === current && 'image-slider__dot--active'
							)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ImageSlider;
