import React from 'react';
import { type IconProps } from '../types/icon.types';

const CheckboxEmptyIcon: React.FC<IconProps> = ({
	size = 24,
	color = 'currentColor',
	...props
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 16 16'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<g clip-path='url(#clip0_31189_34350)'>
			<path
				d='M15.4578 0H0.542222C0.24 0 0 0.24 0 0.542222V15.4578C0 15.76 0.24 16 0.542222 16H15.4578C15.76 16 16 15.76 16 15.4578V0.542222C16 0.24 15.76 0 15.4578 0ZM15.1111 14.5689C15.1111 14.8711 14.8711 15.1111 14.5689 15.1111H1.43111C1.12889 15.1111 0.888889 14.8711 0.888889 14.5689V1.43111C0.888889 1.12889 1.12889 0.888889 1.43111 0.888889H14.5689C14.8711 0.888889 15.1111 1.12889 15.1111 1.43111V14.5689Z'
				fill='black'
			/>
		</g>
		<defs>
			<clipPath id='clip0_31189_34350'>
				<rect width='16' height='16' fill='white' />
			</clipPath>
		</defs>
	</svg>
);

export default CheckboxEmptyIcon;
