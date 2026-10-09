import { useEffect, useRef } from 'react';
import { Offers } from '@entities/offers';
import { ProductCard } from '@entities/product';
import { AddToCartButton } from '@features/addToCart';
import { FavoriteButton } from '@features/toggleFavorite';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import ArrowLeftIcon from '@shared/icons/ArrowLeft';
import ArrowRightIcon from '@shared/icons/ArrowRight';
import { IconButton } from '@shared/ui/IconButton';
import './OffersWidget.scss';

const MAX_OFFERS = 20;

const OffersWidget = () => {
	const dispatch = useAppDispatch();
	const items = useAppSelector(state => state.offers.items);
	const listRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		dispatch(Offers.actions.getOffersRequest());
	}, [dispatch]);

	if (items.length === 0) return null;

	const scrollByPage = (direction: 1 | -1) => {
		const list = listRef.current;
		if (!list) return;

		list.scrollBy({
			left: direction * list.clientWidth * 0.8,
			behavior: 'smooth'
		});
	};

	return (
		<section className='offers-widget'>
			<div className='offers-widget__head'>
				<h2 className='offers-widget__title'>Вам может понравиться</h2>

				<div className='offers-widget__controls'>
					<IconButton
						size='m'
						icon={<ArrowLeftIcon />}
						onClick={() => scrollByPage(-1)}
						aria-label='Предыдущие товары'
					/>
					<IconButton
						size='m'
						icon={<ArrowRightIcon />}
						onClick={() => scrollByPage(1)}
						aria-label='Следующие товары'
					/>
				</div>
			</div>

			<div className='offers-widget__list' ref={listRef}>
				{items.slice(0, MAX_OFFERS).map(item => (
					<div className='offers-widget__item' key={item.id}>
						<ProductCard
							item={item}
							variant='grid'
							cartAction={<AddToCartButton productId={item.id} />}
							favoriteAction={
								<FavoriteButton productId={item.id} />
							}
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default OffersWidget;
