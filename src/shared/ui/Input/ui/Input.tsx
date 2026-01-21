import React, { type InputHTMLAttributes, type ReactNode } from 'react';
import './Input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	button?: ReactNode;
	className?: string;
}

const Input: React.FC<InputProps> = ({
	label,
	button,
	className,
	...props
}) => {
	return (
		<div className='input'>
			{label && <label className='input__label'>{label}</label>}
			<div className='input__wrapper'>
				<input className='input__field' {...props} />
				{button && <div className='input__button'>{button}</div>}
			</div>
		</div>
	);
};

export default Input;
