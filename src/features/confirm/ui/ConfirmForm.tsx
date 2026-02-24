import { Button } from '@shared/ui/Button';
import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Confirm } from '..';
import './ConfirmForm.scss';
import { Modal } from '@features/modal';

const ConfirmForm = () => {
	const dispatch = useAppDispatch();
	const { isLoading, type, email, errors } = useAppSelector(
		state => state.confirm
	);
	const [code, setCode] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSumbit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(
			Confirm.actions.confirmRequest({
				email: email,
				url: type,
				code: code
			})
		);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			inputRef.current?.focus();
		}, 0);

		return () => clearTimeout(timer);
	}, []);

	return (
		<form onSubmit={handleSumbit} className='confirm-form'>
			<h2 className='confirm-form__title'>Введите код подтверждения</h2>
			<span>На вашу почту был отправлен код подтвержения</span>
			{/* <span>Получить новый код можно через 01:59</span> */}
			<div
				className='confirm-form__code-wrapper'
				onClick={() => inputRef.current?.focus()}
			>
				<input
					ref={inputRef}
					type='text'
					inputMode='numeric'
					maxLength={6}
					value={code}
					onChange={e => {
						const value = e.target.value.replace(/[^0-9]/g, '');
						setCode(value);
					}}
					className='confirm-form__hidden-input'
				/>

				<div className='confirm-form__cells'>
					{Array.from({ length: 6 }).map((_, index) => {
						const isActive = index === code.length;

						return (
							<div
								key={index}
								className={`confirm-form__cell ${
									isActive ? 'is-active' : ''
								}`}
							>
								{code[index] || ''}
							</div>
						);
					})}
				</div>
			</div>
			{errors && <span style={{color: 'red'}}>{errors.code?.message}</span>}
			<Button type='submit' loading={isLoading}>
				Подтвердить
			</Button>
			<span
				onClick={() => dispatch(Modal.actions.openModal('register'))}
				className='confirm-form__link'
			>
				Изменить почту
			</span>
		</form>
	);
};

export default ConfirmForm;
