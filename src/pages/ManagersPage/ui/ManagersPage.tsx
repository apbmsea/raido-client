import { useSearchParams } from 'react-router-dom';
import { Manager, ManagerList, type ManagerType } from '@entities/manager';
import { Modal } from '@entities/modal';
import { useAppDispatch } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import ManagerInvitation from './ManagerInvitation';
import './ManagersPage.scss';

const ManagersPage = () => {
	const [searchParams] = useSearchParams();
	const invitationToken = searchParams.get('invitation_token');
	usePageTitle(invitationToken ? 'Приглашение менеджера' : 'Менеджеры');

	const dispatch = useAppDispatch();

	if (invitationToken) {
		return <ManagerInvitation token={invitationToken} />;
	}

	const handleDelete = (manager: ManagerType) => {
		dispatch(Manager.actions.setManagerToDelete(manager));
		dispatch(Modal.actions.openModal('deleteManager'));
	};

	return (
		<section className='managers-page'>
			<h1 className='managers-page__title'>Менеджеры</h1>
			<ManagerList onDelete={handleDelete} />
			<Button
				onClick={() => dispatch(Modal.actions.openModal('addManager'))}
			>
				Добавить менеджера
			</Button>
			<div className='managers-page__information'>
				<h2 className='managers-page__information-title'>
					Кто такие менеджеры?
				</h2>
				<p>
					Менеджеры — это люди, которые могут оформлять заказы от
					имени вашей компании и обрабатывать их. Это удобно для
					ограничения доступа к основному аккаунту или распределения
					заказов между менеджерами. В любой момент менеджера можно
					отвязать от корпоративного аккаунта.
				</p>
				<p>
					Чтобы добавить менеджера, нажмите «Добавить менеджера» и
					укажите его email. Если аккаунт с таким email существует,
					ему будет присвоен статус менеджера. Если нет, будет создан
					новый аккаунт, а пароль отправлен на указанный email.
				</p>
			</div>
		</section>
	);
};

export default ManagersPage;
