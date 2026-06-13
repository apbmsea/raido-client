import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useEffect, useState } from 'react';
import { Review } from '..';
import { useParams } from 'react-router-dom';
import { ReviewCard } from './ReviewCard';
import './ReviewsList.scss';
import { Button } from '@shared/ui/Button';
import MessageIcon from '@shared/icons/Message';
import { Loader } from '@shared/ui/Loader';

export const ReviewsList = () => {
	const dispatch = useAppDispatch();
	const { reviews, isLoading } = useAppSelector(state => state.review);
	const { id } = useParams();
	const [visibleCount, setVisibleCount] = useState(3);
	const visibleReviews = reviews.slice(0, visibleCount);
	const handleShowMore = () => {
		setVisibleCount(prevCount => prevCount + 5);
	};

	useEffect(() => {
		if (id && reviews.length === 0) {
			dispatch(Review.actions.getReviewRequest({ productId: Number(id) }));
		}
	}, [id, dispatch, reviews.length]);

	if (isLoading) return <Loader />

	if (!reviews.length) {
		return (
			<div className='reviews-empty'>
				<MessageIcon className='reviews-empty__icon' size={40} />
				<span className='reviews-empty__title'>Отзывов о товаре пока нет</span>
			</div>
		);
	}



	return (
		<div className='reviews-wrapper'>
			<div className='reviews-list'>
				{visibleReviews.map(review => (
					<ReviewCard review={review} key={review.id} />
				))}
			</div>
			{reviews.length > visibleCount && (
				<Button size='s' variant='outline' onClick={handleShowMore}>
					Показать еще
				</Button>
			)}
		</div>
	);
};
