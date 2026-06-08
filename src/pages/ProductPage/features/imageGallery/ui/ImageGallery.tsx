import { useState, useRef, useEffect } from 'react';
import './ImageGallery.scss';

type ImageGalleryProps = {
	images: { image_250x250?: string; image_700x700?: string }[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
	const [selected, setSelected] = useState(0);
	const [hovered, setHovered] = useState<number | null>(null);
	const thumbsRef = useRef<(HTMLDivElement | null)[]>([]);

	if (!images || images.length === 0) {
		return <div className='image-gallery__placeholder'>Нет фото</div>;
	}

	const activeIndex = hovered !== null ? hovered : selected;
	const mainImage = images[activeIndex]?.image_700x700;

	useEffect(() => {
		const activeThumb = thumbsRef.current[selected];
		if (activeThumb) {
			activeThumb.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			});
		}
	}, [selected]);

	return (
		<div className='image-gallery'>
			<div
				className='image-gallery__sidebar'
				onMouseLeave={() => setHovered(null)}
			>
				{images.map((img, i) => (
					<div
						key={i}
						ref={el => {
							thumbsRef.current[i] = el;
						}}
						className={`image-gallery__thumb ${
							i === activeIndex
								? 'image-gallery__thumb--active'
								: ''
						}`}
						onMouseEnter={() => setHovered(i)}
						onClick={() => setSelected(i)}
					>
						<img
							src={img.image_250x250}
							alt={`Миниатюра ${i + 1}`}
						/>
					</div>
				))}
			</div>

			<div className='image-gallery__main'>
				<img src={mainImage} alt='Выбранное фото' />
			</div>
		</div>
	);
};

export default ImageGallery;