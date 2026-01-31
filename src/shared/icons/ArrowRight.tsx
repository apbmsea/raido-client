import React from 'react';
import { type IconProps } from '../types/icon.types';

const ArrowRigthIcon: React.FC<IconProps> = ({
	size = 24,
	color = 'currentColor',
	...props
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 33 36'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<g clip-path='url(#clip0_36718_24479)'>
			<path
				d='M9 32.6667C12.7249 28.9579 20.1746 20.7311 20.1746 17.4943C20.1746 14.2575 12.7249 6.70506 9 3.33341'
				stroke='black'
				stroke-width='2.25'
				stroke-linecap='round'
			/>
			<path
				d='M17.3826 34.5C21.1074 30.3276 28.5572 21.0724 28.5572 17.431C28.5572 13.7897 21.1074 5.2931 17.3826 1.5'
				stroke='black'
				stroke-width='2.25'
				stroke-linecap='round'
			/>
		</g>
		<defs>
			<clipPath id='clip0_36718_24479'>
				<rect
					width='36'
					height='33'
					fill='white'
					transform='translate(0 36) rotate(-90)'
				/>
			</clipPath>
		</defs>
	</svg>
);

export default ArrowRigthIcon;
