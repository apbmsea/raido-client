import React from 'react';
import StarIcon from '@shared/icons/Star';
import './RatingStars.scss';

interface RatingStarsProps {
	rating: number; // Сюда передаем дробное число, например 4.5, 3.7 и т.д.
	size?: number;
	activeColor?: string;
	inactiveColor?: string;
	className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
	rating,
	activeColor = '#FFE51E',
	inactiveColor = '#D9D9D9',
	className = ''
}) => {
	// Ограничиваем рейтинг строго рамками от 0 до 5
	const validatedRating = Math.min(Math.max(rating, 0), 5);

	return (
		<div className={`rating-stars ${className}`}>
			{Array.from({ length: 5 }).map((_, index) => {
				// Вычисляем процент заполнения конкретной звезды (от 0 до 100)
				const starIndex = index + 1;
				let fillPercentage = 0;

				if (validatedRating >= starIndex) {
					fillPercentage = 100; // Полностью закрашенная звезда
				} else if (validatedRating > index && validatedRating < starIndex) {
					// Рассчитываем остаток для дробной звезды (например 4.5 -> 0.5 * 100 = 50%)
					fillPercentage = (validatedRating - index) * 100;
				}

				return (
					<StarIcon
						key={index}
						size={25}
						fillPercentage={fillPercentage}
						activeColor={activeColor}
						inactiveColor={inactiveColor}
					/>
				);
			})}
		</div>
	);
};

export default RatingStars;