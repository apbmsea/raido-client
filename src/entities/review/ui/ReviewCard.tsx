import { RatingStars } from '@shared/ui/RatingStars';
import type { ReviewType } from '../model/reviewTypes';
import './ReviewCard.scss';

type ReviewCardProps = {
	review: ReviewType;
};

export const ReviewCard = ({ review }: ReviewCardProps) => {
	const formatDate = (isoString: string) => {
		if (!isoString) return '';
		const date = new Date(isoString);
		return date.toLocaleDateString('ru-RU', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};
	return (
		<div className='review-card'>
			<div className='review-card__content'>
				<div className='review-card__information'>
					<span className='review-card__information-name'>
						{review.first_name} {review.last_name}
					</span>
					<div className='review-card__information-date'>
						{formatDate(review.created_at)}
					</div>
				</div>
				<RatingStars rating={Number(review.rating)} size={20} />
			</div>
			<p className='review-card__comment'>{review.comment}</p>
		</div>
	);
};
