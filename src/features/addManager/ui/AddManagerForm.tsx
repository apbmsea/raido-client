import { Manager } from '@entities/manager';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import React, { useState } from 'react';
import './AddManagerForm.scss';

const AddManagerForm = () => {
	const dispatch = useAppDispatch();
	const [formData, setFormData] = useState({
		email: ''
	});

	const { isFetch, errors } = useAppSelector(state => state.manager);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;

		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));

		if (errors?.[name]) {
			dispatch(Manager.actions.clearAllErrors());
		}
	};

	const handleSumbit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(Manager.actions.addManagerRequest(formData));
	};

	return (
		<form className='add-manager-form' onSubmit={handleSumbit}>
			<h2 className='add-manager-form__title'>Добавление менеджера</h2>
			<Input
				autoCapitalize='none'
				spellCheck={false}
				name='email'
				type='email'
				autoComplete='email'
				inputMode='email'
				placeholder='user@example.com'
				label='Эл. почта'
				value={formData.email}
				onChange={handleChange}
				error={errors.email?.message}
			/>
			<Button loading={isFetch} type='submit'>
				Добавить
			</Button>
		</form>
	);
};

export default AddManagerForm;
