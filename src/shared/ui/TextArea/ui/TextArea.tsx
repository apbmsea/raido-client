import React, {
	type TextareaHTMLAttributes,
	type ReactNode
} from 'react';
import './Textarea.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	button?: ReactNode;
	className?: string;
	error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
	label,
	button,
	className,
	error,
	...props
}) => {
	return (
		<div
			className={`textarea ${error ? 'textarea--error' : ''} ${className ?? ''}`}
		>
			{label && <label className='textarea__label'>{label}</label>}

			<div className='textarea__wrapper'>
				<textarea
					className={`textarea__field ${error ? 'textarea__field--error' : ''}`}
					aria-invalid={!!error}
					{...props}
				/>

				{button && <div className='textarea__button'>{button}</div>}
			</div>

			{error && <div className='textarea__error'>{error}</div>}
		</div>
	);
};

export default Textarea;
