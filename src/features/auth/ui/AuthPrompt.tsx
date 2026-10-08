import clsx from 'clsx';
import { Modal } from '@entities/modal';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import './AuthPrompt.scss';

type AuthPromptProps = {
	message: string;
	className?: string;
};

/** Приглашение войти или зарегистрироваться там, где нужен аккаунт */
export const AuthPrompt = ({ message, className }: AuthPromptProps) => {
	const dispatch = useAppDispatch();

	return (
		<div className={clsx('auth-prompt', className)}>
			<p className='auth-prompt__message'>{message}</p>
			<div className='auth-prompt__buttons'>
				<Button onClick={() => dispatch(Modal.actions.openModal('login'))}>
					Войти
				</Button>
				<Button
					onClick={() => dispatch(Modal.actions.openModal('register'))}
					variant='outline'
				>
					Зарегистрироваться
				</Button>
			</div>
		</div>
	);
};
