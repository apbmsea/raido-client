import { useAppSelector } from '@shared/hooks/store.hooks';
import StarIcon from '@shared/icons/Star';
import { RatingStars } from '@shared/ui/RatingStars';
import { plural } from '@shared/utils/plural';
import type { RatingLevel } from '../model/reviewTypes';
import './ReviewTotal.scss';

const RATING_LEVELS: RatingLevel[] = [5, 4, 3, 2, 1];

export const ReviewTotal = () => {
	const { rating, total, counts_of_reviews } = useAppSelector(
		state => state.review
	);

	if (total === 0) return null;

	return (
		<div className='review-total'>
			<div className='review-total__summary'>
				<span className='review-total__rating'>{Number(rating).toFixed(1)}</span>
				<div className='review-total__meta'>
					<RatingStars rating={rating} size={20} />
					<span className='review-total__caption'>
						{total} {plural(total, ['отзыв', 'отзыва', 'отзывов'])}
					</span>
				</div>
			</div>

			<div className='review-total__histogram'>
				{RATING_LEVELS.map(level => {
					const count = counts_of_reviews?.[level] ?? 0;

					return (
						<div key={level} className='review-total__row'>
							<span className='review-total__level'>
								{level}
								<StarIcon size={14} />
							</span>
							<progress
								className='review-total__progress'
								value={count}
								max={total}
								aria-label={`Оценок «${level}»: ${count}`}
							/>
							<span className='review-total__count'>{count}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};
