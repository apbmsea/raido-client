import { useState } from 'react';
import { IconButton } from '@shared/ui/IconButton';
import ArrowRightIcon from '@shared/icons/ArrowRight';

import './FaqBlock.scss';

interface FaqBlockItemProps {
	label: string;
	text: string;
	className?: string;
}

const FaqBlockItem = ({ label, text, className = '' }: FaqBlockItemProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(prev => !prev);
	};

	return (
		<div
			className={`question-item ${isOpen ? 'question-item--open' : ''} ${className}`}
			onClick={handleToggle}
		>
			<div className='question-item__header'>
				<span className='question-item__label'>{label}</span>

				<IconButton
					className='question-item__icon-btn'
					icon={<ArrowRightIcon className='question-item__icon' />}
					aria-label={isOpen ? 'Скрыть ответ' : 'Показать ответ'}
				/>
			</div>

			<div className='question-item__answer'>
				<div className='question-item__text'>{text}</div>
			</div>
		</div>
	);
};

export default FaqBlockItem;
