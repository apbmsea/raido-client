import React from 'react';
import { type IconProps } from '../types/icon.types';

const ManagersIcon: React.FC<IconProps> = ({
	size = 24,
	color = 'currentColor',
	...props
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 26 24'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M20.495 7.2869C20.338 9.46568 18.7217 11.1441 16.9592 11.1441C15.1966 11.1441 13.5777 9.46622 13.4234 7.2869C13.2627 5.02025 14.8361 3.42969 16.9592 3.42969C19.0822 3.42969 20.6557 5.0615 20.495 7.2869Z'
			stroke={color}
			strokeWidth='1.35'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M16.9583 14.5742C13.467 14.5742 10.1097 16.3084 9.26857 19.6856C9.15714 20.1323 9.43732 20.5743 9.89644 20.5743H24.0208C24.4799 20.5743 24.7585 20.1323 24.6487 19.6856C23.8076 16.2542 20.4502 14.5742 16.9583 14.5742Z'
			stroke={color}
			strokeWidth='1.35'
			strokeMiterlimit='10'
		/>
		<path
			d='M9.67193 8.24851C9.54657 9.98854 8.24047 11.3589 6.83259 11.3589C5.42471 11.3589 4.11647 9.98908 3.99326 8.24851C3.86522 6.4383 5.13649 5.14453 6.83259 5.14453C8.52869 5.14453 9.79996 6.47152 9.67193 8.24851Z'
			stroke={color}
			strokeWidth='1.35'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M9.99399 14.6798C9.02701 14.2368 7.96199 14.0664 6.83322 14.0664C4.04746 14.0664 1.36348 15.4513 0.691149 18.1486C0.602755 18.5054 0.826687 18.8585 1.19312 18.8585H7.20822'
			stroke={color}
			strokeWidth='1.35'
			strokeMiterlimit='10'
			strokeLinecap='round'
		/>
	</svg>
);

export default ManagersIcon;
