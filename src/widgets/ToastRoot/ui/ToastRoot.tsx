import { useEffect, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { Toast, TOAST_DURATION, type ToastItem } from '@entities/toast';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import CloseIcon from '@shared/icons/Close';
import './ToastRoot.scss';

const ToastCard = ({ toast }: { toast: ToastItem }) => {
	const dispatch = useAppDispatch();
	const { id, message, variant, undoAction } = toast;

	useEffect(() => {
		const timer = setTimeout(
			() => dispatch(Toast.actions.hideToast(id)),
			TOAST_DURATION
		);

		return () => clearTimeout(timer);
	}, [dispatch, id]);

	const handleUndo = () => {
		if (undoAction) dispatch(undoAction);
		dispatch(Toast.actions.hideToast(id));
	};

	return (
		<div
			className={clsx('toast', `toast--${variant}`)}
			role={variant === 'error' ? 'alert' : 'status'}
			style={
				{ '--toast-duration': `${TOAST_DURATION}ms` } as CSSProperties
			}
		>
			<span className='toast__mark' aria-hidden='true' />
			<p className='toast__message'>{message}</p>
			{undoAction && (
				<button
					type='button'
					className='toast__undo'
					onClick={handleUndo}
				>
					Отменить
				</button>
			)}
			<button
				type='button'
				className='toast__close'
				onClick={() => dispatch(Toast.actions.hideToast(id))}
				aria-label='Закрыть'
			>
				<CloseIcon size={16} />
			</button>
			<span className='toast__progress' aria-hidden='true' />
		</div>
	);
};

const ToastRoot = () => {
	const toast = useAppSelector(state => state.toast.current);

	return createPortal(
		<div className='toast-root'>
			{toast && <ToastCard key={toast.id} toast={toast} />}
		</div>,
		document.body
	);
};

export default ToastRoot;
