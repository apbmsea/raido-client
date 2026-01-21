import React from 'react';
import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'outline';
	size?: 'xs' | 's' | 'm' | 'l';
	loading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	size = 'm',
	loading = false,
	leftIcon,
	rightIcon,
	disabled,
	className,
	...props
}) => {
	return (
		<button
			{...props}
			disabled={disabled || loading}
			className={`btn btn--${variant} btn--${size} ${className} ${loading ? 'btn--loading' : ''}`}
		>
			<span className='btn__content'>
				{leftIcon && (
					<span className='btn__icon btn__icon--left'>
						{leftIcon}
					</span>
				)}

				<span className='btn__text'>{children}</span>

				{rightIcon && (
					<span className='btn__icon btn__icon--right'>
						{rightIcon}
					</span>
				)}
			</span>

			{loading && <span className='btn__spinner' />}
		</button>
	);
};

export default Button;
