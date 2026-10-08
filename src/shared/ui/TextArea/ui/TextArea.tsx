import React, { type TextareaHTMLAttributes, useId } from 'react';
import clsx from 'clsx';
import './TextArea.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
	label,
	className,
	error,
	id,
	...props
}) => {
	const reactId = useId();
	const textareaId = id ?? reactId;
	const errorId = `${textareaId}-error`;

	return (
		<div className={clsx('textarea', className)}>
			{label && (
				<label className='textarea__label' htmlFor={textareaId}>
					{label}
				</label>
			)}

			<textarea
				{...props}
				id={textareaId}
				className={clsx(
					'textarea__field',
					error && 'textarea__field--error'
				)}
				aria-invalid={!!error}
				aria-describedby={error ? errorId : undefined}
			/>

			{error && (
				<div className='textarea__error' id={errorId}>
					{error}
				</div>
			)}
		</div>
	);
};

export default Textarea;
