import { useState } from 'react';
import { Modal, skipConfirmation } from '@entities/modal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { Checkbox } from '@shared/ui/Checkbox';

const ConfirmActionModal = () => {
	const dispatch = useAppDispatch();
	const confirmation = useAppSelector(state => state.modal.confirmation);
	const [isSkipChecked, setIsSkipChecked] = useState(false);

	if (!confirmation) return null;

	const { title, text, confirmLabel, action, skipKey } = confirmation;

	const handleConfirm = () => {
		if (skipKey && isSkipChecked) skipConfirmation(skipKey);

		dispatch(action);
		dispatch(Modal.actions.closeModal());
	};

	return (
		<div className='modal-form'>
			<h2 className='modal-form__title'>{title}</h2>
			{text && <p className='modal-form__text'>{text}</p>}
			{skipKey && (
				<Checkbox
					name='skip_confirmation'
					label='Больше не спрашивать'
					checked={isSkipChecked}
					onChange={e => setIsSkipChecked(e.target.checked)}
				/>
			)}
			<div className='modal-form__buttons'>
				<Button onClick={handleConfirm} variant='outline'>
					{confirmLabel}
				</Button>
				<Button onClick={() => dispatch(Modal.actions.closeModal())}>
					Отмена
				</Button>
			</div>
		</div>
	);
};

export default ConfirmActionModal;
