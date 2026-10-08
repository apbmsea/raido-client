import { useId, useState } from 'react';
import clsx from 'clsx';
import ArrowDownIcon from '@shared/icons/ArrowDown';

import './FaqBlock.scss';

interface FaqBlockProps {
	label: string;
	text: string;
	className?: string;
}

const FaqBlock = ({ label, text, className }: FaqBlockProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const answerId = useId();

	return (
		<div className={clsx('faq-block', isOpen && 'faq-block--open', className)}>
			<button
				type='button'
				className='faq-block__header'
				aria-expanded={isOpen}
				aria-controls={answerId}
				onClick={() => setIsOpen(prev => !prev)}
			>
				<span className='faq-block__label'>{label}</span>
				<ArrowDownIcon className='faq-block__icon' size={18} />
			</button>

			<div className='faq-block__answer' id={answerId}>
				<div className='faq-block__text'>{text}</div>
			</div>
		</div>
	);
};

export default FaqBlock;
