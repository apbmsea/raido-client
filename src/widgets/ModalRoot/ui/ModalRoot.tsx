import { useCallback, type ComponentType } from 'react';
import { Modal, type ModalType } from '@entities/modal';
import { AddManagerForm, AddManagerSuccessWindow } from '@features/addManager';
import {
	ConfirmForm,
	ConfirmSuccessWindow,
	LoginForm,
	RegisterForm
} from '@features/auth';
import { OrderCreatedWindow } from '@features/checkout';
import { ConfirmActionModal } from '@features/confirmAction';
import { DeleteManagerModal } from '@features/deleteManager';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Modal as ModalWindow } from '@shared/ui/Modal';

const MODAL_CONTENT: Record<ModalType, ComponentType> = {
	register: RegisterForm,
	login: LoginForm,
	confirm: ConfirmForm,
	confirmSuccess: ConfirmSuccessWindow,
	addManager: AddManagerForm,
	addManagerSuccess: AddManagerSuccessWindow,
	deleteManager: DeleteManagerModal,
	confirmAction: ConfirmActionModal,
	orderCreated: OrderCreatedWindow
};

const ModalRoot = () => {
	const dispatch = useAppDispatch();
	const type = useAppSelector(state => state.modal.type);

	const onClose = useCallback(
		() => dispatch(Modal.actions.closeModal()),
		[dispatch]
	);

	const Content = type ? MODAL_CONTENT[type] : null;

	return (
		<ModalWindow isOpen={Content !== null} onClose={onClose}>
			{Content && <Content key={type} />}
		</ModalWindow>
	);
};

export default ModalRoot;
