import React from 'react';
import './IconButton.scss';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: number;
	icon: React.ReactNode;
	counter?: number;
	variant?: 'primary' | 'outline';
	className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
	size = 50,
	icon,
	counter,
	variant = 'outline',
	disabled = false,
	className,
	...props
}) => {
	const buttonStyle = {
		width: `${size}px`,
		height: `${size}px`,
		borderRadius: '50%'
	};

	return (
		<button
			{...props}
			disabled={disabled}
			style={buttonStyle}
			className={`icon-button ${className} ${variant} ${disabled ? 'icon-button--disabled' : ''}`}
		>
			{icon}

			{counter !== undefined && counter > 0 && (
				<span
					className='icon-button__counter'
					style={{
						minWidth: `${size / 2.5}px`,
						height: `${size / 2.5}px`
					}}
				>
					{counter}
				</span>
			)}
		</button>
	);
};

export default IconButton;
