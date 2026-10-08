import React from 'react';
import { type IconProps } from '../types/icon.types';

const CloseIcon: React.FC<IconProps> = ({
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
			d='M21.7798 22.957C19.1351 20.3237 13.8457 14.4826 13.8457 12.1844C13.8457 9.88628 19.1351 4.52393 21.7798 2.13003'
			stroke={color}
			strokeWidth='1.59752'
			strokeLinecap='round'
		/>
		<path
			d='M4.26025 22.957C6.90495 20.3237 12.1943 14.4826 12.1943 12.1844C12.1943 9.88628 6.90495 4.52393 4.26025 2.13003'
			stroke={color}
			strokeWidth='1.59752'
			strokeLinecap='round'
		/>
	</svg>
);

export default CloseIcon;
