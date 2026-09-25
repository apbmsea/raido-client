import { ManagerList } from '@entities/manager';
import { Button } from '@shared/ui/Button';

import './ManagersPage.scss';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { Modal } from '@entities/modal';

const ManagersPage = () => {
	const dispatch = useAppDispatch();

	return (
		<main className='managers-page'>
			<ManagerList />
			<Button
				onClick={() => dispatch(Modal.actions.openModal('addManager'))}
			>
				Добавить менеджера
			</Button>
			<div className='managers-page__information'>
				<h2 className='managers-page__information-title'>
					Кто такие менеджеры?
				</h2>
				<div className='managers-page__information-content'>
					<p>
						Менеджеры - это люди, которые могут оформлять заказы от
						имени вашей компании и обрабатывать их. Это удобно для
						ограничения доступа к основному аккаунту или
						распределения заказов между менеджерами. В любой момент
						менеджера можно отвязать от корпоративного аккаунта.
					</p>
					<p>
						Чтобы добавить менеджера, нажмите “Добавить” и укажите
						его email. Если аккаунт с таким email существует, ему
						будет присвоен статус менеджера. Если нет, будет создан
						новый аккаунт, а пароль отправлен на указанный email.
					</p>
				</div>
			</div>
		</main>
	);
};

export default ManagersPage;
