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
		<g clip-path='url(#clip0_34753_6615)'>
			<path
				d='M19.1704 2.36659C16.5257 4.99988 11.2363 10.841 11.2363 13.1392C11.2363 15.4373 16.5257 20.7997 19.1704 23.1936'
				stroke='black'
				stroke-width='1.59752'
				stroke-linecap='round'
			/>
			<path
				d='M13.2188 1.06495C10.5741 4.02741 5.28467 10.5987 5.28467 13.1841C5.28467 15.7695 10.5741 21.8021 13.2187 24.4953'
				stroke='black'
				stroke-width='1.59752'
				stroke-linecap='round'
			/>
		</g>
		<defs>
			<clipPath id='clip0_34753_6615'>
				<rect
					width='25.5604'
					height='25.5604'
					fill='white'
					transform='matrix(0 1 -1 0 25.5605 9.53674e-06)'
				/>
			</clipPath>
		</defs>
	</svg>
);

export default ArrowLeftIcon;
