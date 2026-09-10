import React from 'react';
import { type IconProps } from '../types/icon.types';

const PlusIcon: React.FC<IconProps> = ({
	size = 24,
	color = 'currentColor',
	...props
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 8 8'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M2.99325 7.29597V-2.76566e-05H4.83325V7.29597H2.99325ZM0.00125003 4.54397V2.73597H7.80925V4.54397H0.00125003Z'
			fill={color}
		/>
	</svg>
);

export default PlusIcon;
