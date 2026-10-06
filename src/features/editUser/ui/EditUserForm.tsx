import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import './EditUserForm.scss';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { User } from '@entities/user';
import { UnauthWidget } from '@widgets/UnauthWidget';
import { Loader } from '@shared/ui/Loader';
import type { UserType } from '@entities/user/model/userTypes';
import { logoutUser } from '@entities/user/model/userApi';
import { formatPhone, normalizePhone } from '@shared/utils/phone';
import { isValidBirthDate, toDateInputValue } from '@shared/utils/birthDate';
import { SecuritySettings } from '@features/security';

interface FormFields {
	surname: string;
	name: string;
	phone: string;
	date_of_birth: string;
}

const today = new Date().toISOString().slice(0, 10);

export const EditUserForm = () => {
	const { user, isLogin, isLoading, isFetch } = useAppSelector(
		state => state.user
	);

	if (isLoading) return <Loader />;

	if (!isLogin || !user) {
		return (
			<UnauthWidget message='Войдите в профиль, чтобы изменить настройки' />
		);
	}

	return <EditUserFields user={user} isFetch={isFetch} />;
};

const EditUserFields = ({
	user,
	isFetch
}: {
	user: UserType;
	isFetch: boolean;
}) => {
	const dispatch = useAppDispatch();
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [formData, setFormData] = useState<FormFields>(() => ({
		surname: user.surname || '',
		name: user.name || '',
		phone: normalizePhone(user.phone),
		date_of_birth: toDateInputValue(user.date_of_birth)
	}));

	const [validationErrors, setValidationErrors] = useState({
		phone: '',
		date_of_birth: ''
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]:
				name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value
		}));
		if (name === 'phone' || name === 'date_of_birth') {
			setValidationErrors(prev => ({ ...prev, [name]: '' }));
		}
	};

	const phoneError =
		formData.phone.length > 0 && formData.phone.length !== 10
			? 'Введите 10 цифр без кода страны'
			: validationErrors.phone;
	const dateError = !isValidBirthDate(formData.date_of_birth)
		? 'Укажите существующую дату не позже сегодняшнего дня'
		: validationErrors.date_of_birth;

	const isChanged =
		formData.surname !== (user.surname || '') ||
		formData.name !== (user.name || '') ||
		formData.phone !== normalizePhone(user.phone) ||
		formData.date_of_birth !== toDateInputValue(user.date_of_birth);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isChanged) return;

		const nextErrors = {
			phone:
				formData.phone.length > 0 && formData.phone.length !== 10
					? 'Введите 10 цифр без кода страны'
					: '',
			date_of_birth: isValidBirthDate(formData.date_of_birth)
				? ''
				: 'Укажите существующую дату не позже сегодняшнего дня'
		};
		setValidationErrors(nextErrors);
		if (nextErrors.phone || nextErrors.date_of_birth) return;

		dispatch(
			User.actions.editUserRequest({
				payload: {
					...formData,
					phone: formData.phone,
					date_of_birth: formData.date_of_birth
				}
			})
		);
	};

	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			await logoutUser();
		} catch (error) {
			console.error('Не удалось завершить сессию на сервере', error);
		} finally {
			localStorage.removeItem('token');
			dispatch(User.actions.clearUser());
		}
	};

	return (
		<div className='edit-user'>
			<form className='edit-user__form' onSubmit={handleSubmit}>
				<div className='edit-user__content'>
					<h2>{user.email}</h2>
					<div className='edit-user__block'>
						<Input
							label='Фамилия'
							placeholder='Фамилия'
							name='surname'
							value={formData.surname}
							onChange={handleChange}
							disabled={isFetch}
						/>
						<Input
							label='Имя'
							placeholder='Имя'
							name='name'
							value={formData.name}
							onChange={handleChange}
							disabled={isFetch}
						/>
					</div>
					<div className='edit-user__block'>
						<Input
							label='Телефон'
							placeholder='999 999-99-99'
							startAdornment='+7'
							name='phone'
							type='tel'
							inputMode='numeric'
							value={formatPhone(formData.phone)}
							onChange={handleChange}
							disabled={isFetch}
							error={phoneError}
						/>
						<Input
							label='Дата рождения'
							type='date'
							name='date_of_birth'
							value={formData.date_of_birth}
							onChange={handleChange}
							disabled={isFetch}
							max={today}
							error={dateError}
						/>
					</div>
				</div>

				{isChanged && (
					<Button
						type='submit'
						variant='primary'
						className='edit-user__save-btn'
						loading={isFetch}
					>
						Сохранить
					</Button>
				)}
			</form>

			<SecuritySettings email={user.email} />

			<div className='edit-user__buttons'>
				<Button
					onClick={handleLogout}
					type='button'
					variant='outline'
					loading={isLoggingOut}
				>
					Выйти
				</Button>
			</div>
		</div>
	);
};
