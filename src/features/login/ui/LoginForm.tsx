import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import './LoginForm.scss';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Login } from '..';
import { Modal } from '@features/modal';

const LoginForm = () => {
	const dispatch = useAppDispatch();
	const { isLoading, errors } = useAppSelector(state => state.login);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		is_corporate: false
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));
	};

	const handleSumbit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(Login.actions.loginRequest(formData));
	};

	return (
		<form onSubmit={handleSumbit} className='login-form'>
			<h2 className='login-form__title'>Вход</h2>
			<Input
				name='email'
				placeholder='Эл. Почта'
				label='Эл. Почта'
				value={formData.email}
				onChange={handleChange}
				error={errors.email?.message}
			/>

			<Input
				type='password'
				name='password'
				placeholder='Пароль'
				label='Пароль'
				value={formData.password}
				onChange={handleChange}
				error={errors.password?.message}
			/>

			<span onClick={() => dispatch(Modal.actions.openModal('register'))} className='login-form__link'>Нет аккаунта? Зарегистрироваться</span>

			<Button type='submit' loading={isLoading}>
				Войти
			</Button>
			{/* <span className='register-form__link'>
				Зарегистрироваться как корпоративный клиент
			</span> */}
		</form>
	);
};

export default LoginForm;
