import { useEffect, useRef, useState, type FormEvent } from 'react';
import clsx from 'clsx';
import { Modal } from '@entities/modal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { actions } from '../model/confirmSlice';
import './ConfirmForm.scss';

const CODE_LENGTH = 6;

const ConfirmForm = () => {
	const dispatch = useAppDispatch();
	const { isLoading, type, email, errors } = useAppSelector(
		state => state.confirm
	);
	const [code, setCode] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const errorMessage = Object.values(errors)[0]?.message;

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (code.length !== CODE_LENGTH) return;

		dispatch(actions.confirmRequest({ email, url: type, code }));
	};

	return (
		<form onSubmit={handleSubmit} className='modal-form'>
			<h2 className='modal-form__title'>Введите код подтверждения</h2>
			<p className='modal-form__text'>
				Мы отправили код подтверждения на {email || 'вашу почту'}
			</p>

			<label className='confirm-code'>
				<span className='visually-hidden'>Код подтверждения</span>
				<input
					ref={inputRef}
					className='confirm-code__input'
					type='text'
					inputMode='numeric'
					autoComplete='one-time-code'
					maxLength={CODE_LENGTH}
					value={code}
					onChange={e => {
						setCode(e.target.value.replace(/\D/g, ''));
						if (errorMessage) dispatch(actions.clearAllErrors());
					}}
				/>

				<span className='confirm-code__cells' aria-hidden='true'>
					{Array.from({ length: CODE_LENGTH }, (_, index) => (
						<span
							key={index}
							className={clsx(
								'confirm-code__cell',
								index === code.length && 'confirm-code__cell--active',
								errorMessage && 'confirm-code__cell--error'
							)}
						>
							{code[index]}
						</span>
					))}
				</span>
			</label>

			{errorMessage && (
				<p className='modal-form__error' role='alert'>
					{errorMessage}
				</p>
			)}

			<Button
				type='submit'
				loading={isLoading}
				disabled={code.length !== CODE_LENGTH}
			>
				Подтвердить
			</Button>

			{type === 'register' && (
				<button
					type='button'
					className='modal-form__link'
					onClick={() => dispatch(Modal.actions.openModal('register'))}
				>
					Изменить почту
				</button>
			)}
			{type === 'login' && (
				<button
					type='button'
					className='modal-form__link'
					onClick={() => dispatch(Modal.actions.openModal('login'))}
				>
					Вернуться ко входу
				</button>
			)}
		</form>
	);
};

export default ConfirmForm;
