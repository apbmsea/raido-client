import React, { type InputHTMLAttributes, useId } from 'react';
import clsx from 'clsx';
import './Checkbox.scss';

import CheckboxEmptyIcon from '@shared/icons/CheckboxEmpty';
import CheckboxCheckedIcon from '@shared/icons/CheckboxChecked';

interface CheckboxProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'type'
> {
	label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
	label,
	id,
	className,
	...props
}) => {
	const reactId = useId();
	const checkboxId = id ?? reactId;

	return (
		<label htmlFor={checkboxId} className={clsx('checkbox', className)}>
			<input
				id={checkboxId}
				type='checkbox'
				className='checkbox__input'
				{...props}
			/>

			<span className='checkbox__icon'>
				<CheckboxEmptyIcon className='checkbox__icon-empty' />
				<CheckboxCheckedIcon className='checkbox__icon-checked' />
			</span>

			{label && <span className='checkbox__label'>{label}</span>}
		</label>
	);
};

export default Checkbox;
