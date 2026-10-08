import React, { useId, useState } from 'react';
import clsx from 'clsx';
import './RatingInput.scss';
import StarIcon from '@shared/icons/Star';

interface RatingInputProps {
	label?: string;
	maxStars?: number;
	value?: number;
	onChange?: (rating: number) => void;
	error?: string;
	className?: string;
	disabled?: boolean;
}

export const RatingInput: React.FC<RatingInputProps> = ({
	label,
	maxStars = 5,
	value = 0,
	onChange,
	error,
	className,
	disabled = false
}) => {
	const groupName = useId();
	const [hoveredRating, setHoveredRating] = useState<number | null>(null);

	return (
		<div className={clsx('star-rating', className)}>
			{label && <span className='star-rating__label'>{label}</span>}

			<div
				className='star-rating__stars'
				role='radiogroup'
				aria-label={label ?? 'Оценка'}
				onMouseLeave={() => setHoveredRating(null)}
			>
				{Array.from({ length: maxStars }, (_, index) => {
					const starValue = index + 1;
					const isActive = starValue <= (hoveredRating ?? value);

					return (
						<label
							key={starValue}
							className={clsx(
								'star-rating__star',
								disabled && 'star-rating__star--disabled'
							)}
							onMouseEnter={() =>
								!disabled && setHoveredRating(starValue)
							}
						>
							<input
								type='radio'
								name={groupName}
								value={starValue}
								checked={value === starValue}
								onChange={() => onChange?.(starValue)}
								disabled={disabled}
								className='star-rating__input'
								aria-label={`${starValue} из ${maxStars}`}
							/>
							<StarIcon
								size={26}
								fillPercentage={isActive ? 100 : 0}
								className='star-rating__icon'
							/>
						</label>
					);
				})}
			</div>

			{error && <div className='star-rating__error'>{error}</div>}
		</div>
	);
};

export default RatingInput;
