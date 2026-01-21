import React from 'react';
import { type IconProps } from '../types/icon.types';

const SearchIcon: React.FC<IconProps> = ({
	size = 24,
	color = 'currentColor',
	...props
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 20 20'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M13.8466 13.088L13.1114 13.7822C12.7938 14.082 12.8027 14.5968 13.1312 14.9319L16.7198 18.5931C17.0483 18.9283 17.5721 18.9569 17.8897 18.6571L18.6249 17.963C18.9425 17.6631 18.9336 17.1484 18.605 16.8132L15.0164 13.152C14.6879 12.8169 14.1642 12.7882 13.8466 13.088Z'
			fill='white'
		/>
		<path
			d='M7.25293 0.599609C10.9286 0.599609 13.9062 3.57248 13.9062 7.23633C13.9062 10.9002 10.9286 13.873 7.25293 13.873C3.57732 13.873 0.599609 10.9002 0.599609 7.23633C0.599636 3.57249 3.57733 0.599638 7.25293 0.599609Z'
			stroke='white'
			stroke-width='1.2'
		/>
	</svg>
);

export default SearchIcon;
