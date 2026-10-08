import { Avatar } from '@shared/ui/Avatar';
import { RatingStars } from '@shared/ui/RatingStars';
import { formatDate } from '@shared/utils/formatDate';
import type { ReviewType } from '../model/reviewTypes';
import './ReviewCard.scss';

type ReviewCardProps = {
	review: ReviewType;
};

export const ReviewCard = ({ review }: ReviewCardProps) => {
	const authorName = [review.first_name, review.last_name]
		.filter(Boolean)
		.join(' ');

	return (
		<article className='review-card'>
			<div className='review-card__header'>
				<Avatar name={authorName} />
				<div className='review-card__author'>
					<span className='review-card__name'>
						{authorName || 'Анонимный пользователь'}
					</span>
					<time className='review-card__date' dateTime={review.created_at}>
						{formatDate(review.created_at)}
					</time>
				</div>
				<RatingStars
					className='review-card__rating'
					rating={Number(review.rating)}
					size={18}
				/>
			</div>
			{/* Отзыв можно оставить и без текста, одной оценкой */}
			{review.comment && (
				<p className='review-card__comment'>{review.comment}</p>
			)}
		</article>
	);
};
