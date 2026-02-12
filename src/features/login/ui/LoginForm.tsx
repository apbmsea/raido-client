import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import './LoginForm.scss';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Login } from '..';

const LoginForm = () => {
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector(state => state.register);
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
		<form onSubmit={handleSumbit} className='register-form'>
			<h2 className='register-form__title'>Вход</h2>
			<Input
				name='email'
				placeholder='Эл. Почта'
				label='Эл. Почта'
				value={formData.email}
				onChange={handleChange}
			/>

			<Input
				type='password'
				name='password'
				placeholder='Пароль'
				label='Пароль'
				value={formData.password}
				onChange={handleChange}
			/>

			<span className='register-form__link'>Уже есть аккаунт? Войти</span>

			<Button type='submit' loading={isLoading}>
				Зарегистрироваться
			</Button>
			<span className='register-form__link'>
				Зарегистрироваться как корпоративный клиент
			</span>
		</form>
	);
};

export default LoginForm;
