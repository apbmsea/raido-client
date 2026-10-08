import React, {
	type InputHTMLAttributes,
	type ReactNode,
	useId,
	useState
} from 'react';
import clsx from 'clsx';
import './Input.scss';
import PasswordIcon from '@shared/icons/Password';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	button?: ReactNode;
	startAdornment?: ReactNode;
	endAdornment?: ReactNode;
	error?: string;
}

const Input: React.FC<InputProps> = ({
	label,
	button,
	startAdornment,
	endAdornment,
	className,
	type,
	error,
	id,
	...props
}) => {
	const reactId = useId();
	const inputId = id ?? reactId;
	const errorId = `${inputId}-error`;

	const isPassword = type === 'password';
	const [showPassword, setShowPassword] = useState(false);

	const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

	return (
		<div className={clsx('input', error && 'input--error', className)}>
			{label && (
				<label className='input__label' htmlFor={inputId}>
					{label}
				</label>
			)}

			<div className='input__wrapper'>
				{startAdornment && (
					<span className='input__prefix' aria-hidden='true'>
						{startAdornment}
					</span>
				)}
				<input
					{...props}
					id={inputId}
					className={clsx(
						'input__field',
						startAdornment && 'input__field--with-prefix',
						(isPassword || button || endAdornment) &&
							'input__field--with-suffix',
						error && 'input__field--error'
					)}
					type={inputType}
					aria-invalid={!!error}
					aria-describedby={error ? errorId : undefined}
				/>

				{endAdornment && (
					<span className='input__suffix' aria-hidden='true'>
						{endAdornment}
					</span>
				)}

				{isPassword && (
					<button
						type='button'
						className={clsx(
							'input__icon-button',
							showPassword && 'input__icon-button--active'
						)}
						onClick={() => setShowPassword(p => !p)}
						aria-label={
							showPassword ? 'Скрыть пароль' : 'Показать пароль'
						}
					>
						<PasswordIcon />
					</button>
				)}

				{button && <div className='input__button'>{button}</div>}
			</div>

			{error && (
				<div className='input__error' id={errorId}>
					{error}
				</div>
			)}
		</div>
	);
};

export default Input;
