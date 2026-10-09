import React from 'react';
import { type IconProps } from '../types/icon.types';

const ArrowLeftIcon: React.FC<IconProps> = ({
	size = 24,
	color = 'currentColor',
	...props
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 26 26'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M19.1704 2.36659C16.5257 4.99988 11.2363 10.841 11.2363 13.1392C11.2363 15.4373 16.5257 20.7997 19.1704 23.1936'
			stroke={color}
			strokeWidth='1.59752'
			strokeLinecap='round'
		/>
		<path
			d='M13.2188 1.06495C10.5741 4.02741 5.28467 10.5987 5.28467 13.1841C5.28467 15.7695 10.5741 21.8021 13.2187 24.4953'
			stroke={color}
			strokeWidth='1.59752'
			strokeLinecap='round'
		/>
	</svg>
);

export default ArrowLeftIcon;
