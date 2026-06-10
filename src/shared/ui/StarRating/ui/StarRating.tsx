import React, { useState } from 'react';
import './StarRating.scss';
import StarIcon from '@shared/icons/Star';

interface StarRatingProps {
	label?: string;
	maxStars?: number;
	value?: number;
	onChange?: (rating: number) => void;
	error?: string;
	className?: string;
	disabled?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
	label,
	maxStars = 5,
	value = 0,
	onChange,
	error,
	className,
	disabled = false,
}) => {
	const [hoveredRating, setHoveredRating] = useState<number | null>(null);

	const handleStarClick = (rating: number) => {
		if (!disabled && onChange) {
			onChange(rating);
		}
	};

	return (
		<div className={`star-rating ${error ? 'star-rating--error' : ''} ${className ?? ''}`}>
			{label && <span className="star-rating__label">{label}</span>}

			<div className="star-rating__stars">
				{Array.from({ length: maxStars }, (_, index) => {
					const starValue = index + 1;
					const isActive = starValue <= (hoveredRating ?? value);

					return (
						<label
							key={starValue}
							className={`star-rating__star-label ${disabled ? 'star-rating__star-label--disabled' : ''}`}
							onMouseEnter={() => !disabled && setHoveredRating(starValue)}
							onMouseLeave={() => !disabled && setHoveredRating(null)}
						>
							<input
								type="radio"
								name="rating"
								value={starValue}
								checked={value === starValue}
								onChange={() => handleStarClick(starValue)}
								disabled={disabled}
								className="star-rating__radio-input"
							/>
							{/* Передаем currentColor в саму иконку, если она поддерживает проп color, 
							    либо управляем через CSS ниже */}
							<div className={`star-rating__icon ${isActive ? 'star-rating__icon--active' : ''}`}>
								<StarIcon />
							</div>
						</label>
					);
				})}
			</div>

			{error && <div className="star-rating__error">{error}</div>}
		</div>
	);
};

export default StarRating;
