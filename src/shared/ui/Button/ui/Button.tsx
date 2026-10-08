import React from 'react';
import clsx from 'clsx';
import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'outline';
	size?: 'xs' | 's' | 'm' | 'l';
	loading?: boolean;
	fullWidth?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	size = 'm',
	loading = false,
	fullWidth = false,
	leftIcon,
	rightIcon,
	disabled,
	className,
	type = 'button',
	...props
}) => {
	return (
		<button
			{...props}
			type={type}
			disabled={disabled || loading}
			aria-busy={loading || undefined}
			className={clsx(
				'btn',
				`btn--${variant}`,
				`btn--${size}`,
				loading && 'btn--loading',
				fullWidth && 'btn--full-width',
				className
			)}
		>
			<span className='btn__content'>
				{leftIcon && <span className='btn__icon'>{leftIcon}</span>}

				<span className='btn__text'>{children}</span>

				{rightIcon && <span className='btn__icon'>{rightIcon}</span>}
			</span>

			{loading && <span className='btn__spinner' />}
		</button>
	);
};

export default Button;
