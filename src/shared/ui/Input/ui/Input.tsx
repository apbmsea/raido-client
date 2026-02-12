import React, {
	type InputHTMLAttributes,
	type ReactNode,
	useState
} from 'react';
import './Input.scss';
import PasswordIcon from '@shared/icons/Password';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	button?: ReactNode;
	className?: string;
	error?: string;
}

const Input: React.FC<InputProps> = ({
	label,
	button,
	className,
	type,
	error,
	...props
}) => {
	const isPassword = type === 'password';
	const [showPassword, setShowPassword] = useState(false);

	const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

	return (
		<div
			className={`input ${error ? 'input--error' : ''} ${className ?? ''}`}
		>
			{label && <label className='input__label'>{label}</label>}

			<div className='input__wrapper'>
				<input
					className={`input__field ${
						isPassword ? 'input__field--with-icon' : ''
					} ${error ? 'input__field--error' : ''}`}
					type={inputType}
					aria-invalid={!!error}
					{...props}
				/>

				{isPassword && (
					<button
						type='button'
						className='input__icon-button'
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

			{error && <div className='input__error'>{error}</div>}
		</div>
	);
};

export default Input;
