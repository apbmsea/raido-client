import React from 'react';
import { type IconProps } from '../types/icon.types';

const ListViewIcon: React.FC<IconProps> = ({
	size = 24,
	color = 'currentColor',
	...props
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 22 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<g clipPath='url(#clip0)'>
			<path
				d='M20.706 0H0.640393C0.286714 0 0 0.228421 0 0.510192V3.93698C0 4.21875 0.286714 4.44717 0.640393 4.44717H20.706C21.0597 4.44717 21.3464 4.21875 21.3464 3.93698V0.510192C21.3464 0.228421 21.0597 0 20.706 0Z'
				fill={color}
			/>
			<path
				d='M20.706 7.11548H0.640393C0.286714 7.11548 0 7.38958 0 7.72771V11.8399C0 12.178 0.286714 12.4521 0.640393 12.4521H20.706C21.0597 12.4521 21.3464 12.178 21.3464 11.8399V7.72771C21.3464 7.38958 21.0597 7.11548 20.706 7.11548Z'
				fill={color}
			/>
			<path
				d='M20.706 15.1204H0.640393C0.286714 15.1204 0 15.3488 0 15.6306V19.0574C0 19.3391 0.286714 19.5676 0.640393 19.5676H20.706C21.0597 19.5676 21.3464 19.3391 21.3464 19.0574V15.6306C21.3464 15.3488 21.0597 15.1204 20.706 15.1204Z'
				fill={color}
			/>
		</g>
		<defs>
			<clipPath id='clip0'>
				<rect width='21.3464' height='19.5676' fill='white' />
			</clipPath>
		</defs>
	</svg>
);

export default ListViewIcon;