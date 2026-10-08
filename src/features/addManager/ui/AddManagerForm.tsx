import { useEffect, useState, type FormEvent } from 'react';
import { Manager } from '@entities/manager';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';

const AddManagerForm = () => {
	const dispatch = useAppDispatch();
	const [email, setEmail] = useState('');
	const { isFetch, errors } = useAppSelector(state => state.manager);
	const formError = Object.entries(errors).find(
		([key]) => key !== 'email'
	)?.[1].message;

	useEffect(() => {
		dispatch(Manager.actions.clearAllErrors());
	}, [dispatch]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		dispatch(Manager.actions.addManagerRequest({ email: email.trim() }));
	};

	return (
		<form className='modal-form' onSubmit={handleSubmit}>
			<h2 className='modal-form__title'>Добавление менеджера</h2>
			<Input
				autoCapitalize='none'
				spellCheck={false}
				name='email'
				type='email'
				autoComplete='email'
				inputMode='email'
				placeholder='user@example.com'
				label='Эл. почта'
				value={email}
				onChange={e => {
					setEmail(e.target.value);
					if (Object.keys(errors).length > 0) {
						dispatch(Manager.actions.clearAllErrors());
					}
				}}
				error={errors.email?.message}
				required
			/>
			{formError && (
				<p className='modal-form__error' role='alert'>
					{formError}
				</p>
			)}
			<Button loading={isFetch} type='submit'>
				Добавить
			</Button>
		</form>
	);
};

export default AddManagerForm;
