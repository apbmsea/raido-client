import React from 'react';
import { type IconProps } from '../types/icon.types';

const MinusIcon: React.FC<IconProps> = ({
	size = 24,
	color = 'currentColor',
	...props
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 7 2'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M0.00153136 1.80798V-2.47955e-05H6.75353V1.80798H0.00153136Z'
			fill={color}
		/>
	</svg>
);

export default MinusIcon;
