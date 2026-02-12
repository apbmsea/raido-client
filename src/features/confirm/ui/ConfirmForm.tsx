import { Button } from '@shared/ui/Button';
import { useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Confirm } from '..';
import './ConfirmForm.scss';
import { Modal } from '@features/modal';

const ConfirmForm = () => {
	const dispatch = useAppDispatch();
	const { isLoading, type, email } = useAppSelector(
		state => state.confirm
	);
	const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
	const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

	const handleSumbit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(
			Confirm.actions.confirmRequest({
				email: email,
				url: type,
				code: code.join('')
			})
		);
	};

	return (
		<form onSubmit={handleSumbit} className='confirm-form'>
			<h2 className='confirm-form__title'>Введите код подтверждения</h2>
			<span>На вашу почту был отправлен код подтвержения</span>
			{/* <span>Получить новый код можно через 01:59</span> */}
			<div className='confirm-form__code-inputs'>
				{code.map((digit, index) => (
					<input
						key={index}
						ref={el => {
							inputRefs.current[index] = el;
						}}
						type='text'
						inputMode='numeric'
						maxLength={1}
						value={digit}
						className='confirm-form__code-input'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							const value = e.target.value.replace(/[^0-9]/g, '');
							if (value) {
								const newCode = [...code];
								newCode[index] = value;
								setCode(newCode);
								if (index < 5) {
									inputRefs.current[index + 1]?.focus();
								}
							}
						}}
						onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
							if (e.key === 'Backspace' && !code[index] && index > 0) {
								inputRefs.current[index - 1]?.focus();
							}
						}}
					/>
				))}
			</div>
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
