import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import './EditUserForm.scss';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { User } from '@entities/user';
import { UnauthWidget } from '@widgets/UnauthWidget';
import { Loader } from '@shared/ui/Loader';

interface FormFields {
	surname: string;
	name: string;
	phone: string;
	date_of_birth: string;
}

export const EditUserForm = () => {
	const dispatch = useAppDispatch();
	const { user, isLogin, isLoading, isFetch } = useAppSelector(
		state => state.user
	);

	const [formData, setFormData] = useState<FormFields>({
		surname: '',
		name: '',
		phone: '',
		date_of_birth: ''
	});

	useEffect(() => {
		if (user) {
			setFormData({
				surname: user.surname || '',
				name: user.name || '',
				phone: user.phone || '',
				date_of_birth: user.date_of_birth || ''
			});
		}
	}, [user]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const isChanged =
		formData.surname !== (user?.surname || '') ||
		formData.name !== (user?.name || '') ||
		formData.phone !== (user?.phone || '') ||
		formData.date_of_birth !== (user?.date_of_birth || '');

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!isChanged) return;

		dispatch(User.actions.editUserRequest({ payload: formData }));
	};

	if (isLoading) return <Loader />;

	if (!isLogin) {
		return (
			<UnauthWidget message='Войдите в профиль, чтобы изменить настройки' />
		);
	}

	return (
		<form className='edit-user' onSubmit={handleSubmit}>
			<div className='edit-user__content'>
				<h2>{user?.email}</h2>
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
						placeholder='+7 (999) 999-99-99'
						name='phone'
						value={formData.phone}
						onChange={handleChange}
						disabled={isFetch}
					/>
					<Input
						label='Дата рождения'
						placeholder='Дата рождения'
						name='date_of_birth'
						value={formData.date_of_birth}
						onChange={handleChange}
						disabled={isFetch}
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

			<div className='edit-user__buttons'>
				<Button
					onClick={() => {
						localStorage.removeItem('token');
						dispatch(User.actions.clearUser());
					}}
					type='button'
					variant='outline'
				>
					Выйти
				</Button>
				<Button type='button' variant='outline'>
					Удалить профиль
				</Button>
			</div>
		</form>
	);
};
