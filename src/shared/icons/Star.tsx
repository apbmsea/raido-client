import React, { useId } from 'react';
import clsx from 'clsx';
import { type IconProps } from '../types/icon.types';
import './Star.scss';

interface StarIconProps extends Omit<IconProps, 'color'> {
	fillPercentage?: number;
}

const StarIcon: React.FC<StarIconProps> = ({
	size = 24,
	fillPercentage = 100,
	className,
	...props
}) => {
	const gradientId = useId();
	const isPartial = fillPercentage > 0 && fillPercentage < 100;

	return (
		<svg
			{...props}
			className={clsx(
				'star-icon',
				fillPercentage <= 0 && 'star-icon--empty',
				className
			)}
			width={size}
			height={size}
			viewBox='0 0 26 24'
			xmlns='http://www.w3.org/2000/svg'
		>
			{isPartial && (
				<defs>
					<linearGradient id={gradientId}>
						<stop
							className='star-icon__stop-active'
							offset={`${fillPercentage}%`}
						/>
						<stop
							className='star-icon__stop-inactive'
							offset={`${fillPercentage}%`}
						/>
					</linearGradient>
				</defs>
			)}
			<path
				d='M5.8673 23.9088C5.24005 24.2256 4.5283 23.6704 4.65505 22.9616L6.0038 15.3939L0.278936 10.0245C-0.255687 9.52208 0.0221868 8.60371 0.73881 8.50452L8.69804 7.39095L12.247 0.467984C12.5672 -0.155995 13.4333 -0.155995 13.7534 0.467984L17.3024 7.39095L25.2616 8.50452C25.9782 8.60371 26.2561 9.52208 25.7199 10.0245L19.9966 15.3939L21.3454 22.9616C21.4721 23.6704 20.7604 24.2256 20.1331 23.9088L12.9978 20.2993L5.8673 23.9088Z'
				fill={isPartial ? `url(#${gradientId})` : 'currentColor'}
			/>
		</svg>
	);
};

export default StarIcon;
