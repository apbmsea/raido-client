import { useState, useRef } from 'react';
import './ImageSlider.scss';

type ImageSliderProps = {
	images: { image_250x250?: string }[];
};

const ImageSlider = ({ images }: ImageSliderProps) => {
	const [current, setCurrent] = useState(0);
	const startX = useRef<number | null>(null);

	const prev = () => setCurrent(i => (i - 1 + images.length) % images.length);
	const next = () => setCurrent(i => (i + 1) % images.length);

	const onStart = (x: number) => {
		startX.current = x;
	};
	const onEnd = (x: number) => {
		if (startX.current === null) return;
		const diff = startX.current - x;
		if (Math.abs(diff) > 30) diff > 0 ? next() : prev();
		startX.current = null;
	};

	return (
		<div
			className='image-slider'
			onMouseDown={e => onStart(e.clientX)}
			onMouseUp={e => onEnd(e.clientX)}
			onMouseLeave={() => {
				startX.current = null;
			}}
			onTouchStart={e => onStart(e.touches[0].clientX)}
			onTouchEnd={e => onEnd(e.changedTouches[0].clientX)}
		>
			<div className='image-slider__images'>
				{images.length === 0 ? (
					<div className='image-slider__placeholder'>Нет фото</div>
				) : (
					<div
						className='image-slider__track'
						style={{ transform: `translateX(-${current * 100}%)` }}
					>
						{images.map((img, i) => (
							<div key={i} className='image-slider__slide'>
								<img
									src={img.image_250x250}
									alt=''
									draggable={false}
								/>
							</div>
						))}
					</div>
				)}
			</div>

			<div className='image-slider__dots'>
				{images.map((_, i) => (
					<span
						key={i}
						className={`image-slider__dot${i === current ? ' image-slider__dot--active' : ''}`}
					/>
				))}
			</div>
		</div>
	);
};

export default ImageSlider;
