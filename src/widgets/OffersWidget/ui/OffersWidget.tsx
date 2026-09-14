import { useEffect, useRef } from 'react';

import { Offers } from '@entities/offers';
import { CatalogCard } from '@entities/catalog';

import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';

import './OffersWidget.scss';

import { IconButton } from '@shared/ui/IconButton';

import ArrowLeftIcon from '@shared/icons/ArrowLeft';
import ArrowRigthIcon from '@shared/icons/ArrowRight';
import { Loader } from '@shared/ui/Loader';

const SCROLL_AMOUNT = 320;

const OffersWidget = () => {
	const { items, isLoading } = useAppSelector(state => state.offers);

	const dispatch = useAppDispatch();

	const listRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		dispatch(Offers.actions.getOffersRequest());
	}, [dispatch]);

	const offerItems = items.slice(0, 20);

	useEffect(() => {
		const list = listRef.current;

		if (!list || !offerItems.length) {
			return;
		}

		requestAnimationFrame(() => {
			list.scrollLeft = list.scrollWidth / 3;
		});
	}, [offerItems.length]);

	if (!offerItems.length) {
		return null;
	}

	const scrollLeft = () => {
		const list = listRef.current;

		if (!list) {
			return;
		}

		list.scrollBy({
			left: -SCROLL_AMOUNT,
			behavior: 'smooth'
		});
	};

	const scrollRight = () => {
		const list = listRef.current;

		if (!list) {
			return;
		}

		list.scrollBy({
			left: SCROLL_AMOUNT,
			behavior: 'smooth'
		});
	};

	const handleScroll = () => {
		const list = listRef.current;

		if (!list) {
			return;
		}

		const thirdWidth = list.scrollWidth / 3;

		if (list.scrollLeft <= 0) {
			list.scrollLeft = thirdWidth;
			return;
		}

		if (list.scrollLeft >= thirdWidth * 2) {
			list.scrollLeft = thirdWidth;
		}
	};

	const carouselItems = [...offerItems, ...offerItems, ...offerItems];

	if (isLoading) return <Loader />;

	return (
		<section className='offers-widget'>
			<h2 className='offers-widget__title'>Вам может понравиться</h2>

			<div className='offers-widget__carousel'>
				<IconButton
					icon={<ArrowLeftIcon />}
					onClick={scrollLeft}
					aria-label='Предыдущие товары'
					className='offers-widget__button offers-widget__button--prev'
				/>

				<div
					className='offers-widget__list'
					ref={listRef}
					onScroll={handleScroll}
				>
					{carouselItems.map((item, index) => (
						<div
							className='offers-widget__item'
							key={`${item.id}-${index}`}
						>
							<CatalogCard item={item} variant='grid' />
						</div>
					))}
				</div>

				<IconButton
					icon={<ArrowRigthIcon />}
					onClick={scrollRight}
					aria-label='Следующие товары'
					className='offers-widget__button offers-widget__button--next'
				/>
			</div>
		</section>
	);
};

export default OffersWidget;
