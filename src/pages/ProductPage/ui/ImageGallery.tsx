import { useState } from 'react';
import clsx from 'clsx';
import type { ProductImage } from '@entities/product';
import ImageLightbox from './ImageLightbox';
import './ImageGallery.scss';

type ImageGalleryProps = {
	images: ProductImage[];
	alt: string;
};

const ImageGallery = ({ images, alt }: ImageGalleryProps) => {
	const [selected, setSelected] = useState(0);
	// Наведение на миниатюру показывает фото, не меняя выбранного
	const [hovered, setHovered] = useState<number | null>(null);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);

	if (images.length === 0) {
		return (
			<div className='image-gallery'>
				<div className='image-gallery__main image-gallery__main--empty'>
					Нет фото
				</div>
			</div>
		);
	}

	const activeIndex = hovered ?? selected;
	const activeImage = images[activeIndex] ?? images[0];

	return (
		<div className='image-gallery'>
			{images.length > 1 && (
				<div
					className='image-gallery__thumbs'
					onMouseLeave={() => setHovered(null)}
				>
					{images.map((image, index) => (
						<button
							type='button'
							key={index}
							className={clsx(
								'image-gallery__thumb',
								index === activeIndex &&
									'image-gallery__thumb--active'
							)}
							onMouseEnter={() => setHovered(index)}
							onClick={e => {
								setSelected(index);
								// Докручиваем ленту, если миниатюра видна не целиком
								e.currentTarget.scrollIntoView({
									behavior: 'smooth',
									block: 'nearest',
									inline: 'nearest'
								});
							}}
							aria-label={`Фото ${index + 1}`}
							aria-pressed={index === selected}
						>
							<img
								src={image.image_88x88 ?? image.image_250x250}
								alt=''
								loading='lazy'
							/>
						</button>
					))}
				</div>
			)}

			<button
				type='button'
				className='image-gallery__main'
				onClick={() => setIsLightboxOpen(true)}
				aria-label='Открыть фото на весь экран'
			>
				<img
					src={activeImage.image_700x700 ?? activeImage.image_500x500}
					alt={alt}
				/>
			</button>

			{isLightboxOpen && (
				<ImageLightbox
					images={images}
					index={selected}
					alt={alt}
					onChange={setSelected}
					onClose={() => setIsLightboxOpen(false)}
				/>
			)}
		</div>
	);
};

export default ImageGallery;
