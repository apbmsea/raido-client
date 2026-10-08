import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@shared/icons/Close';
import { useLockScroll } from '@shared/hooks/useLockScroll.hook';
import './Modal.scss';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	useLockScroll(isOpen);

	useEffect(() => {
		if (!isOpen) return;

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return createPortal(
		// Закрываем по mousedown, а не по click: иначе окно закроется,
		// если начать выделять текст в поле и отпустить кнопку за его пределами
		<div
			className='modal'
			onMouseDown={e => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div className='modal__content' role='dialog' aria-modal='true'>
				<button
					type='button'
					className='modal__close'
					onClick={onClose}
					aria-label='Закрыть'
				>
					<CloseIcon size={22} />
				</button>
				{children}
			</div>
		</div>,
		document.body
	);
};

export default Modal;
