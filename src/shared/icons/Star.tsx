import React, { useId } from 'react';
import { type IconProps } from '../types/icon.types';

interface StarIconProps extends IconProps {
	fillPercentage?: number;
	activeColor?: string;
	inactiveColor?: string;
}

const StarIcon: React.FC<StarIconProps> = ({
	size = 24,
	fillPercentage = 100,
	activeColor = '#FFE51E',
	inactiveColor = '#D9D9D9',
	...props
}) => {
	const gradientId = useId();

	let fillValue = activeColor;
	if (fillPercentage <= 0) {
		fillValue = inactiveColor;
	} else if (fillPercentage < 100) {
		fillValue = `url(#${gradientId})`;
	}

	return (
		<svg
			{...props}
			width={size}
			height={size}
			viewBox='0 0 26 24'
			xmlns='http://w3.org'
			style={{ overflow: 'visible', ...props.style }}
		>
			<defs>
				{fillPercentage > 0 && fillPercentage < 100 && (
					<linearGradient id={gradientId} x1='0%' y1='0%' x2='100%' y2='0%'>
						<stop offset={`${fillPercentage}%`} stopColor={activeColor} />
						<stop offset={`${fillPercentage}%`} stopColor={inactiveColor} />
					</linearGradient>
				)}
			</defs>
			<path
				d='M5.8673 23.9088C5.24005 24.2256 4.5283 23.6704 4.65505 22.9616L6.0038 15.3939L0.278936 10.0245C-0.255687 9.52208 0.0221868 8.60371 0.73881 8.50452L8.69804 7.39095L12.247 0.467984C12.5672 -0.155995 13.4333 -0.155995 13.7534 0.467984L17.3024 7.39095L25.2616 8.50452C25.9782 8.60371 26.2561 9.52208 25.7199 10.0245L19.9966 15.3939L21.3454 22.9616C21.4721 23.6704 20.7604 24.2256 20.1331 23.9088L12.9978 20.2993L5.8673 23.9088Z'
				// Переносим fill и stroke в инлайновые стили:
				style={{ 
					fill: fillValue, 
					stroke: fillPercentage <= 0 ? inactiveColor : activeColor,
					strokeWidth: '0.5px'
				}}
			/>
		</svg>
	);
};

export default StarIcon;
