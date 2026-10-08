import React from 'react';
import clsx from 'clsx';
import StarIcon from '@shared/icons/Star';
import './RatingStars.scss';

const STARS_COUNT = 5;

interface RatingStarsProps {
	/** Дробный рейтинг, например 4.5 */
	rating: number;
	size?: number;
	className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
	rating,
	size = 24,
	className
}) => {
	const validatedRating = Math.min(Math.max(rating, 0), STARS_COUNT);

	return (
		<div
			className={clsx('rating-stars', className)}
			role='img'
			aria-label={`Оценка ${validatedRating} из ${STARS_COUNT}`}
		>
			{Array.from({ length: STARS_COUNT }, (_, index) => (
				<StarIcon
					key={index}
					size={size}
					// Для 4.5 первые четыре звезды заполнены целиком, пятая — наполовину
					fillPercentage={
						Math.min(Math.max(validatedRating - index, 0), 1) * 100
					}
				/>
			))}
		</div>
	);
};

export default RatingStars;
