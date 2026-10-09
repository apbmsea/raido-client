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
	inn: string;
	post: string;
}

const PHONE_ERROR = 'Введите 10 цифр без кода страны';
const DATE_ERROR = 'Укажите существующую дату не позже сегодняшнего дня';
const INN_ERROR = 'ИНН состоит из 10 или 12 цифр';
const INN_LENGTHS = [10, 12];
const INN_MAX_LENGTH = 12;
const DIGIT_FIELDS: Partial<Record<keyof FormFields, number>> = {
	phone: PHONE_LENGTH,
	inn: INN_MAX_LENGTH
};

const getInitialFields = (user: UserType): FormFields => ({
	surname: user.surname || '',
	name: user.name || '',
	phone: normalizePhone(user.phone),
	date_of_birth: toDateInputValue(user.date_of_birth),
	inn: user.inn ? String(user.inn) : '',
	post: user.post || ''
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
	const innError =
		formData.inn.length > 0 && !INN_LENGTHS.includes(formData.inn.length)
			? INN_ERROR
			: '';
	const hasError = !!phoneError || !!dateError || !!innError;

	const formError = Object.entries(editErrors).find(
		([key]) => !(key in formData)
	)?.[1].message;

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const digitsLimit = DIGIT_FIELDS[name as keyof FormFields];

		setFormData(prev => ({
			...prev,
			[name]: digitsLimit
				? value.replace(/\D/g, '').slice(0, digitsLimit)
				: value
		}));

		if (Object.keys(editErrors).length > 0) {
			dispatch(User.actions.clearEditErrors());
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!isChanged || hasError) return;

		const { inn, post, ...personal } = formData;

		dispatch(
			User.actions.editUserRequest(
				user.is_corporate
					? { ...personal, inn: inn ? Number(inn) : null, post }
					: personal
			)
		);
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

			{user.is_corporate && (
				<div className='edit-user__row'>
					<Input
						label='ИНН компании'
						placeholder='ИНН'
						name='inn'
						inputMode='numeric'
						value={formData.inn}
						onChange={handleChange}
						disabled={isFetch}
						error={innError || editErrors.inn?.message}
					/>
					<Input
						label='Должность'
						placeholder='Должность'
						name='post'
						autoComplete='organization-title'
						value={formData.post}
						onChange={handleChange}
						disabled={isFetch}
						error={editErrors.post?.message}
					/>
				</div>
			)}

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
					disabled={hasError}
				>
					Сохранить
				</Button>
			)}
		</form>
	);
};
