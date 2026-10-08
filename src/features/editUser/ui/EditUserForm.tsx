import { useState, type ChangeEvent, type FormEvent } from 'react';
import { User, type UserType } from '@entities/user';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { isValidBirthDate, toDateInputValue } from '@shared/utils/birthDate';
import { formatPhone, normalizePhone, PHONE_LENGTH } from '@shared/utils/phone';
import './EditUserForm.scss';

interface FormFields {
	surname: string;
	name: string;
	phone: string;
	date_of_birth: string;
}

const PHONE_ERROR = 'Введите 10 цифр без кода страны';
const DATE_ERROR = 'Укажите существующую дату не позже сегодняшнего дня';

const getInitialFields = (user: UserType): FormFields => ({
	surname: user.surname || '',
	name: user.name || '',
	phone: normalizePhone(user.phone),
	date_of_birth: toDateInputValue(user.date_of_birth)
});

export const EditUserForm = ({ user }: { user: UserType }) => {
	const dispatch = useAppDispatch();
	const { isFetch, editErrors } = useAppSelector(state => state.user);
	const [formData, setFormData] = useState(() => getInitialFields(user));

	const savedFields = getInitialFields(user);
	const isChanged = (Object.keys(savedFields) as (keyof FormFields)[]).some(
		key => formData[key] !== savedFields[key]
	);

	const phoneError =
		formData.phone.length > 0 && formData.phone.length !== PHONE_LENGTH
			? PHONE_ERROR
			: '';
	const dateError = isValidBirthDate(formData.date_of_birth) ? '' : DATE_ERROR;

	const formError = Object.entries(editErrors).find(
		([key]) => !(key in formData)
	)?.[1].message;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData(prev => ({
			...prev,
			[name]:
				name === 'phone'
					? value.replace(/\D/g, '').slice(0, PHONE_LENGTH)
					: value
		}));

		if (Object.keys(editErrors).length > 0) {
			dispatch(User.actions.clearEditErrors());
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!isChanged || phoneError || dateError) return;

		dispatch(User.actions.editUserRequest(formData));
	};

	return (
		<form className='edit-user' onSubmit={handleSubmit}>
			<h2 className='edit-user__email'>{user.email}</h2>
			<div className='edit-user__row'>
				<Input
					label='Фамилия'
					placeholder='Фамилия'
					name='surname'
					autoComplete='family-name'
					value={formData.surname}
					onChange={handleChange}
					disabled={isFetch}
					error={editErrors.surname?.message}
				/>
				<Input
					label='Имя'
					placeholder='Имя'
					name='name'
					autoComplete='given-name'
					value={formData.name}
					onChange={handleChange}
					disabled={isFetch}
					error={editErrors.name?.message}
				/>
			</div>
			<div className='edit-user__row'>
				<Input
					label='Телефон'
					placeholder='999 999-99-99'
					startAdornment='+7'
					name='phone'
					type='tel'
					inputMode='numeric'
					autoComplete='tel-national'
					value={formatPhone(formData.phone)}
					onChange={handleChange}
					disabled={isFetch}
					error={phoneError || editErrors.phone?.message}
				/>
				<Input
					label='Дата рождения'
					type='date'
					name='date_of_birth'
					autoComplete='bday'
					value={formData.date_of_birth}
					onChange={handleChange}
					disabled={isFetch}
					max={new Date().toISOString().slice(0, 10)}
					error={dateError || editErrors.date_of_birth?.message}
				/>
			</div>

			{formError && (
				<p className='edit-user__error' role='alert'>
					{formError}
				</p>
			)}

			{isChanged && (
				<Button
					type='submit'
					className='edit-user__submit'
					loading={isFetch}
					disabled={!!phoneError || !!dateError}
				>
					Сохранить
				</Button>
			)}
		</form>
	);
};
