import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { Modal } from '@entities/modal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { getFormError } from '../lib/getFormError';
import { actions } from '../model/loginSlice';

const LoginForm = () => {
	const dispatch = useAppDispatch();
	const { isLoading, errors } = useAppSelector(state => state.login);
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});
	const formError = getFormError(errors, ['email', 'password']);

	// Ошибки прошлой попытки не должны встречать при повторном открытии окна
	useEffect(() => {
		dispatch(actions.clearAllErrors());
	}, [dispatch]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData(prev => ({ ...prev, [name]: value }));

		if (Object.keys(errors).length > 0) {
			dispatch(actions.clearAllErrors());
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(
			actions.loginRequest({
				email: formData.email.trim(),
				password: formData.password,
				is_corporate: false
			})
		);
	};

	return (
		<form onSubmit={handleSubmit} className='modal-form'>
			<h2 className='modal-form__title'>Вход</h2>
			<Input
				name='email'
				type='email'
				autoComplete='email'
				inputMode='email'
				autoCapitalize='none'
				spellCheck={false}
				placeholder='Эл. почта'
				label='Эл. почта'
				value={formData.email}
				onChange={handleChange}
				error={errors.email?.message}
				required
			/>

			<Input
				type='password'
				name='password'
				autoComplete='current-password'
				placeholder='Пароль'
				label='Пароль'
				value={formData.password}
				onChange={handleChange}
				error={errors.password?.message}
				required
			/>

			{formError && (
				<p className='modal-form__error' role='alert'>
					{formError}
				</p>
			)}

			<Button type='submit' loading={isLoading}>
				Войти
			</Button>

			<button
				type='button'
				className='modal-form__link'
				onClick={() => dispatch(Modal.actions.openModal('register'))}
			>
				Нет аккаунта? Зарегистрироваться
			</button>
		</form>
	);
};

export default LoginForm;
