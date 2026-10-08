import clsx from 'clsx';
import './Loader.scss';

interface LoaderProps {
	text?: string;
	className?: string;
}

export const Loader = ({ text = 'Загрузка', className }: LoaderProps) => {
	return (
		<div className={clsx('loader', className)} role='status'>
			<div className='loader__spinner' />
			<span className='loader__text'>{text}</span>
		</div>
	);
};
