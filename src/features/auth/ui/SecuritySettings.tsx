import { useState, type FormEvent } from 'react';
import { Modal } from '@entities/modal';
import { requestPasswordChange, requestTwoFactorSwitch } from '@entities/user';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { isApiError } from '@shared/utils/errorHandler';
import type { ConfirmType } from '../model/authTypes';
import { actions as confirmActions } from '../model/confirmSlice';
import './SecuritySettings.scss';

const MIN_PASSWORD_LENGTH = 8;
const REQUEST_ERROR =
	'Не удалось отправить код подтверждения. Попробуйте ещё раз.';

const getTwoFactorTexts = (isTwoFactorEnabled: null | boolean) => {
	if (isTwoFactorEnabled === null) {
		return {
			status: 'Текущий статус станет известен после следующего входа в аккаунт.',
			action: 'Изменить настройку'
		};
	}

	return isTwoFactorEnabled
		? { status: 'Сейчас включена.', action: 'Отключить' }
		: { status: 'Сейчас отключена.', action: 'Включить' };
};

export const SecuritySettings = ({ email }: { email: string }) => {
	const dispatch = useAppDispatch();
	const isTwoFactorEnabled = useAppSelector(
		state => state.user.isTwoFactorEnabled
	);
	const twoFactorTexts = getTwoFactorTexts(isTwoFactorEnabled);

	const [isTwoFactorLoading, setIsTwoFactorLoading] = useState(false);
	const [twoFactorError, setTwoFactorError] = useState('');

	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [isPasswordLoading, setIsPasswordLoading] = useState(false);
	const [passwordErrors, setPasswordErrors] = useState({
		new_password: '',
		repeat: '',
		form: ''
	});

	const openConfirm = (type: ConfirmType) => {
		dispatch(confirmActions.startConfirm({ email, type }));
		dispatch(Modal.actions.openModal('confirm'));
	};

	const handleTwoFactorSwitch = async () => {
		setTwoFactorError('');
		setIsTwoFactorLoading(true);
		try {
			await requestTwoFactorSwitch();
			openConfirm('2fa/switch');
		} catch {
			setTwoFactorError(REQUEST_ERROR);
		} finally {
			setIsTwoFactorLoading(false);
		}
	};

	const handlePasswordSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const nextErrors = {
			new_password:
				password.length < MIN_PASSWORD_LENGTH
					? `Пароль должен быть не короче ${MIN_PASSWORD_LENGTH} символов`
					: '',
			repeat: password !== passwordRepeat ? 'Пароли не совпадают' : '',
			form: ''
		};
		setPasswordErrors(nextErrors);
		if (nextErrors.new_password || nextErrors.repeat) return;

		setIsPasswordLoading(true);
		try {
			await requestPasswordChange({ email, new_password: password });
			openConfirm('password/change');
		} catch (error) {
			const apiErrors = isApiError(error) ? error.errors : {};
			const fieldError = apiErrors.new_password?.message ?? '';

			setPasswordErrors({
				new_password: fieldError,
				repeat: '',
				form: fieldError
					? ''
					: (Object.values(apiErrors)[0]?.message ?? REQUEST_ERROR)
			});
		} finally {
			setIsPasswordLoading(false);
		}
	};

	return (
		<section className='security-settings'>
			<div className='security-settings__block'>
				<h3 className='security-settings__title'>
					Двухфакторная аутентификация
				</h3>
				<p className='security-settings__text'>
					При входе в аккаунт на вашу почту будет приходить код
					подтверждения. {twoFactorTexts.status}
				</p>
				<Button
					variant='outline'
					onClick={handleTwoFactorSwitch}
					loading={isTwoFactorLoading}
				>
					{twoFactorTexts.action}
				</Button>
				{twoFactorError && (
					<p className='security-settings__error' role='alert'>
						{twoFactorError}
					</p>
				)}
			</div>

			<form
				className='security-settings__block'
				onSubmit={handlePasswordSubmit}
			>
				<h3 className='security-settings__title'>Смена пароля</h3>
				<p className='security-settings__text'>
					Код подтверждения придёт на {email}. После смены пароля все
					сессии завершатся, и нужно будет войти заново.
				</p>
				<div className='security-settings__fields'>
					<Input
						type='password'
						label='Новый пароль'
						placeholder='Новый пароль'
						name='new_password'
						autoComplete='new-password'
						value={password}
						onChange={e => {
							setPassword(e.target.value);
							setPasswordErrors(prev => ({
								...prev,
								new_password: '',
								form: ''
							}));
						}}
						disabled={isPasswordLoading}
						error={passwordErrors.new_password}
					/>
					<Input
						type='password'
						label='Повторите пароль'
						placeholder='Повторите пароль'
						name='new_password_repeat'
						autoComplete='new-password'
						value={passwordRepeat}
						onChange={e => {
							setPasswordRepeat(e.target.value);
							setPasswordErrors(prev => ({
								...prev,
								repeat: '',
								form: ''
							}));
						}}
						disabled={isPasswordLoading}
						error={passwordErrors.repeat}
					/>
				</div>
				{passwordErrors.form && (
					<p className='security-settings__error' role='alert'>
						{passwordErrors.form}
					</p>
				)}
				<Button type='submit' loading={isPasswordLoading}>
					Сменить пароль
				</Button>
			</form>
		</section>
	);
};
