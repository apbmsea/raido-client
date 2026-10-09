import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { Modal } from '@entities/modal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { Checkbox } from '@shared/ui/Checkbox';
import { Input } from '@shared/ui/Input';
import { Tabs, type TabItem } from '@shared/ui/Tabs';
import { getFormError } from '../lib/getFormError';
import { actions } from '../model/registerSlice';

type RegisterRole = 'personal' | 'corporate';

const ROLE_TABS: TabItem<RegisterRole>[] = [
	{ id: 'personal', label: 'Для себя' },
	{ id: 'corporate', label: 'Корпоративный' }
];

const RegisterForm = () => {
	const dispatch = useAppDispatch();
	const { isLoading, errors } = useAppSelector(state => state.register);
	const [role, setRole] = useState<RegisterRole>('personal');
	const [isTermsAccepted, setIsTermsAccepted] = useState(true);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		secondPassword: ''
	});

	const isCorporate = role === 'corporate';
	const emailLabel = isCorporate ? 'Рабочая эл. почта' : 'Эл. почта';
	const formError = getFormError(errors, ['email', 'password']);

	const passwordMismatchError =
		formData.secondPassword !== '' &&
		formData.password !== formData.secondPassword
			? 'Пароли не совпадают'
			: '';

	useEffect(() => {
		dispatch(actions.clearAllErrors());
	}, [dispatch]);

	const clearErrors = () => {
		if (Object.keys(errors).length > 0) {
			dispatch(actions.clearAllErrors());
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData(prev => ({ ...prev, [name]: value }));
		clearErrors();
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (formData.password !== formData.secondPassword) return;

		dispatch(
			actions.registrationRequest({
				email: formData.email.trim(),
				password: formData.password,
				is_corporate: isCorporate
			})
		);
	};

	return (
		<form onSubmit={handleSubmit} className='modal-form'>
			<h2 className='modal-form__title'>Регистрация</h2>

			<Tabs<RegisterRole>
				items={ROLE_TABS}
				activeTab={role}
				onChange={nextRole => {
					setRole(nextRole);
					clearErrors();
				}}
			/>

			<Input
				autoCapitalize='none'
				spellCheck={false}
				name='email'
				type='email'
				autoComplete='email'
				inputMode='email'
				placeholder={emailLabel}
				label={emailLabel}
				value={formData.email}
				onChange={handleChange}
				error={errors.email?.message}
				required
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
				required
			/>

			<Input
				type='password'
				name='secondPassword'
				autoComplete='new-password'
				placeholder='Повторите пароль'
				label='Повторите пароль'
				value={formData.secondPassword}
				error={passwordMismatchError}
				onChange={handleChange}
				required
			/>

			<Checkbox
				name='terms'
				label='Принимаю условия обработки персональных данных'
				checked={isTermsAccepted}
				onChange={e => setIsTermsAccepted(e.target.checked)}
			/>

			{formError && (
				<p className='modal-form__error' role='alert'>
					{formError}
				</p>
			)}

			<Button
				type='submit'
				disabled={!isTermsAccepted || !!passwordMismatchError}
				loading={isLoading}
			>
				Зарегистрироваться
			</Button>

			<button
				type='button'
				className='modal-form__link'
				onClick={() => dispatch(Modal.actions.openModal('login'))}
			>
				Уже есть аккаунт? Войти
			</button>
		</form>
	);
};

export default RegisterForm;
