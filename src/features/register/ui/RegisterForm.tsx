import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import './RegisterForm.scss';
import { Checkbox } from '@shared/ui/Checkbox';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Register } from '..';
import { Modal } from '@features/modal';

const RegisterForm = () => {
	const [localErrors, setLocalErrors] = useState<Record<string, string>>({
		secondPassword: ''
	});
	const dispatch = useAppDispatch();
	const { isLoading, errors } = useAppSelector(state => state.register);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		secondPassword: '',
		terms: true,
		is_corporate: false
	});
	
	useEffect(() => {
		const errors: Record<string, string> = {};

		if (formData.password !== formData.secondPassword) {
			errors.secondPassword = 'Пароли не совпадают';
		} else {
			setLocalErrors({ secondPassword: '' });
		}

		if (Object.keys(errors).length > 0) {
			setLocalErrors(errors);
			return;
		}
	}, [formData.password, formData.secondPassword]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));

		setLocalErrors(prev => {
			if (!prev[name]) return prev;
			const copy = { ...prev };
			delete copy[name];
			return copy;
		});
		if (errors?.[name]) {
			dispatch(Register.actions.clearFieldError(name));
		}
	};

	const handleSumbit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(Register.actions.registrationRequest(formData));
	};

	return (
		<form onSubmit={handleSumbit} className='register-form'>
			<h2 className='register-form__title'>Регистрация</h2>
			<Input
				autoCapitalize='none'
				spellCheck={false}
				name='email'
				type='email'
				autoComplete='email'
				inputMode='email'
				placeholder='Эл. Почта'
				label='Эл. Почта'
				value={formData.email}
				onChange={handleChange}
				error={errors.email?.message}
			/>

			<Input
				type='password'
				name='password'
				autoComplete='new-password'
				placeholder='Пароль'
				label='Пароль'
				value={formData.password}
				onChange={handleChange}
				error={errors.password?.message}
			/>

			<Input
				type='password'
				name='secondPassword'
				autoComplete='new-password'
				placeholder='Повторите пароль'
				label='Повторите пароль'
				value={formData.secondPassword}
				error={localErrors.secondPassword}
				onChange={handleChange}
			/>
			<span
				onClick={() => dispatch(Modal.actions.openModal('login'))}
				className='register-form__link'
			>
				Уже есть аккаунт? Войти
			</span>
			<Checkbox
				id='terms'
				name='terms'
				label='Принимаю условия обработки персональных данных'
				checked={formData.terms}
				onChange={handleChange}
			/>
			<Button
				type='submit'
				disabled={!formData.terms || !!localErrors.secondPassword}
				loading={isLoading}
			>
				Зарегистрироваться
			</Button>
			{/* <span className='register-form__link'>
				Зарегистрироваться как корпоративный клиент
			</span> */}
		</form>
	);
};

export default RegisterForm;
