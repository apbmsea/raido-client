import type { ReactNode } from 'react';
import clsx from 'clsx';
import './EmptyState.scss';

interface EmptyStateProps {
	title: string;
	description?: string;
	image?: string;
	icon?: ReactNode;
	/** Кнопка или ссылка под текстом */
	action?: ReactNode;
	/** compact — в одну строку, для пустых списков внутри блока */
	variant?: 'default' | 'compact';
	className?: string;
}

const EmptyState = ({
	title,
	description,
	image,
	icon,
	action,
	variant = 'default',
	className
}: EmptyStateProps) => {
	return (
		<div className={clsx('empty-state', `empty-state--${variant}`, className)}>
			{image && <img className='empty-state__image' src={image} alt='' />}
			{icon && <span className='empty-state__icon'>{icon}</span>}

			<div className='empty-state__text'>
				<p className='empty-state__title'>{title}</p>
				{description && (
					<p className='empty-state__description'>{description}</p>
				)}
			</div>

			{action}
		</div>
	);
};

export default EmptyState;
