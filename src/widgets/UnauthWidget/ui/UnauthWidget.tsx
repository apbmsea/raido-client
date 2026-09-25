import { Button } from '@shared/ui/Button';
import './UnauthWidget.scss';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { Modal } from '@entities/modal';

type UnauthWidget = {
	message: string;
};

export const UnauthWidget = ({ message }: UnauthWidget) => {
	const dispatch = useAppDispatch();

	return (
		<div className='unatuh-widget'>
			<h2 className='unatuh-widget__title'>{message}</h2>
			<div className='unatuh-widget__buttons'>
				<Button
					onClick={() => dispatch(Modal.actions.openModal('login'))}
				>
					Войти
				</Button>
				<Button
					onClick={() =>
						dispatch(Modal.actions.openModal('register'))
					}
					variant='outline'
				>
					Зарегистрироваться
				</Button>
			</div>
		</div>
	);
};
