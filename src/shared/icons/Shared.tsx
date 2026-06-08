import React from 'react';
import { type IconProps } from '../types/icon.types';

const SharedIcon: React.FC<IconProps> = ({
	size = 24,
	color = 'currentColor',
	...props
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M13.3377 13.8209C6.20112 13.5362 3.07956 16.4406 1 20C1.43675 16.8983 2.15458 8.11196 13.1111 7.05838C14.2458 6.91542 13.6656 5.11201 13.3377 4.03326C16.6278 3.64173 21.5629 6.77382 23 9.90453C21.5629 13.0379 17.039 16.5615 13.749 16.953C13.749 14.7307 13.7412 14.644 13.3377 13.8209Z'
			stroke={color}
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

export default SharedIcon;
