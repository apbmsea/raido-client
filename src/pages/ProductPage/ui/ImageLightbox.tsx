import { useEffect, useRef, type MouseEvent, type TouchEvent } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import type { ProductImage } from '@entities/product';
import { useLockScroll } from '@shared/hooks/useLockScroll.hook';
import ArrowLeftIcon from '@shared/icons/ArrowLeft';
import ArrowRightIcon from '@shared/icons/ArrowRight';
import CloseIcon from '@shared/icons/Close';
import { AppImage } from '@shared/ui/AppImage';
import { IconButton } from '@shared/ui/IconButton';
import './ImageLightbox.scss';

const SWIPE_THRESHOLD = 50;

type ImageLightboxProps = {
	images: ProductImage[];
	index: number;
	alt: string;
	onChange: (index: number) => void;
	onClose: () => void;
};

const stopPropagation = (e: MouseEvent) => e.stopPropagation();

const ImageLightbox = ({
	images,
	index,
	alt,
	onChange,
	onClose
}: ImageLightboxProps) => {
	const rootRef = useRef<HTMLDivElement>(null);
	const activeThumbRef = useRef<HTMLButtonElement>(null);
	const touchStartX = useRef<number | null>(null);

	const hasMany = images.length > 1;
	const image = images[index] ?? images[0];

	useLockScroll(true);

	const showPrev = () =>
		onChange((index - 1 + images.length) % images.length);
	const showNext = () => onChange((index + 1) % images.length);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
			if (!hasMany) return;
			if (e.key === 'ArrowLeft') showPrev();
			if (e.key === 'ArrowRight') showNext();
		};

		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	});

	useEffect(() => {
		const previous = document.activeElement as HTMLElement | null;
		rootRef.current?.focus();

		return () => previous?.focus();
	}, []);

	useEffect(() => {
		activeThumbRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center'
		});
	}, [index]);

	const handleTouchStart = (e: TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = (e: TouchEvent) => {
		if (touchStartX.current === null || !hasMany) return;

		const delta = e.changedTouches[0].clientX - touchStartX.current;
		touchStartX.current = null;

		if (Math.abs(delta) < SWIPE_THRESHOLD) return;
		if (delta > 0) showPrev();
		else showNext();
	};

	return createPortal(
		<div
			className='image-lightbox'
			role='dialog'
			aria-modal='true'
			aria-label={`Фото товара: ${alt}`}
			tabIndex={-1}
			ref={rootRef}
			onClick={onClose}
		>
			<div className='image-lightbox__top'>
				{hasMany && (
					<span
						className='image-lightbox__counter'
						aria-live='polite'
					>
						{index + 1} / {images.length}
					</span>
				)}
				<IconButton
					className='image-lightbox__close'
					icon={<CloseIcon size={22} />}
					onClick={onClose}
					aria-label='Закрыть'
				/>
			</div>

			<div
				className='image-lightbox__stage'
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				{hasMany && (
					<IconButton
						className='image-lightbox__nav image-lightbox__nav--prev'
						icon={<ArrowLeftIcon size={24} />}
						onClick={e => {
							e.stopPropagation();
							showPrev();
						}}
						aria-label='Предыдущее фото'
					/>
				)}

				<AppImage
					key={index}
					className='image-lightbox__image'
					src={image.image_700x700 ?? image.image_500x500}
					alt={alt}
					onClick={stopPropagation}
				/>

				{hasMany && (
					<IconButton
						className='image-lightbox__nav image-lightbox__nav--next'
						icon={<ArrowRightIcon size={24} />}
						onClick={e => {
							e.stopPropagation();
							showNext();
						}}
						aria-label='Следующее фото'
					/>
				)}
			</div>

			{hasMany && (
				<div
					className='image-lightbox__thumbs'
					onClick={stopPropagation}
				>
					{images.map((thumb, thumbIndex) => (
						<button
							type='button'
							key={thumbIndex}
							ref={
								thumbIndex === index
									? activeThumbRef
									: undefined
							}
							className={clsx(
								'image-lightbox__thumb',
								thumbIndex === index &&
									'image-lightbox__thumb--active'
							)}
							onClick={() => onChange(thumbIndex)}
							aria-label={`Фото ${thumbIndex + 1}`}
							aria-current={thumbIndex === index}
						>
							<AppImage
								src={thumb.image_88x88 ?? thumb.image_250x250}
								alt=''
								loading='lazy'
							/>
						</button>
					))}
				</div>
			)}
		</div>,
		document.body
	);
};

export default ImageLightbox;
