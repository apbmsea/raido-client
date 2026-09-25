import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '..';
import { RegisterForm } from '@features/register';
import './Modal.scss';
import CloseIcon from '@shared/icons/Close';
import { ConfirmForm } from '@features/confirm';
import { LoginForm } from '@features/login';
import { AddManagerForm, AddManagerSuccessWindow } from '@features/addManager';
import { DeleteManagerModal } from '@features/deleteManager';

const ModalComponent = () => {
	const dispatch = useAppDispatch();
	const { type, isOpen } = useAppSelector(state => state.modal);

	const onClose = useCallback(
		() => dispatch(Modal.actions.closeModal()),
		[dispatch]
	);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [onClose]);

	if (!isOpen) return null;

	return createPortal(
		<div className='modal__overlay' onClick={onClose}>
			<div className='modal__content' onClick={e => e.stopPropagation()}>
				{type === 'register' && <RegisterForm />}
				{type === 'login' && <LoginForm />}
				{type === 'confirm' && <ConfirmForm />}
				{type === 'addManager' && <AddManagerForm />}
				{type === 'addManagerSuccess' && <AddManagerSuccessWindow />}

				{type === 'deleteManager' && <DeleteManagerModal />}
				<CloseIcon
					onClick={() => dispatch(Modal.actions.closeModal())}
					className='modal__content-close'
					width={24}
					height={24}
				/>
			</div>
		</div>,
		document.body
	);
};

export default ModalComponent;
