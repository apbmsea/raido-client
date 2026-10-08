import React from 'react';
import clsx from 'clsx';
import './IconButton.scss';

/** xs — 32px, s — 40px, m — 45px, l — 50px, xl — 82px */
export type IconButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: IconButtonSize;
	icon: React.ReactNode;
	counter?: number;
	/** ghost — без рамки и фона, для второстепенных действий */
	variant?: 'primary' | 'outline' | 'ghost';
}

const IconButton: React.FC<IconButtonProps> = ({
	size = 'l',
	icon,
	counter,
	variant = 'outline',
	className,
	type = 'button',
	...props
}) => {
	return (
		<button
			{...props}
			type={type}
			className={clsx(
				'icon-button',
				`icon-button--${variant}`,
				`icon-button--${size}`,
				className
			)}
		>
			{icon}

			{counter !== undefined && counter > 0 && (
				<span className='icon-button__counter'>
					{counter > 99 ? '99+' : counter}
				</span>
			)}
		</button>
	);
};

export default IconButton;
