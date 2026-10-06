import { ManagerList } from '@entities/manager';
import { Button } from '@shared/ui/Button';

import './ManagersPage.scss';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Modal } from '@entities/modal';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
	acceptManagerInvitation,
	getManagerInvitationDetails
} from '@entities/manager/model/managerApi';

interface InvitationDetails {
	organization_name: string;
	organization_email: string;
}

const ManagerInvitation = ({ token }: { token: string }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isLogin, isLoading: isUserLoading } = useAppSelector(
		state => state.user
	);
	const [details, setDetails] = useState<InvitationDetails | null>(null);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [isAccepting, setIsAccepting] = useState(false);

	useEffect(() => {
		let isCurrent = true;

		getManagerInvitationDetails(token)
			.then(data => {
				if (isCurrent) {
					setDetails(data);
					setError('');
				}
			})
			.catch(() => {
				if (isCurrent) {
					setError('Не удалось загрузить данные приглашения.');
				}
			})
			.finally(() => {
				if (isCurrent) setIsLoading(false);
			});

		return () => {
			isCurrent = false;
		};
	}, [token, isLogin]);

	const openLogin = () => dispatch(Modal.actions.openModal('login'));

	const handleAccept = async () => {
		if (!isLogin) {
			openLogin();
			return;
		}

		setIsAccepting(true);
		setError('');
		try {
			await acceptManagerInvitation(token);
			navigate('/profile/organizations', { replace: true });
		} catch {
			setError('Не удалось принять приглашение. Попробуйте еще раз.');
			setIsAccepting(false);
		}
	};

	return (
		<main className='manager-invitation'>
			{isLoading ? (
				<p>Загружаем приглашение...</p>
			) : details ? (
				<>
					<h1 className='manager-invitation__title'>
						{details.organization_name} приглашает вас стать
						менеджером
					</h1>
					<p className='manager-invitation__email'>
						{details.organization_email}
					</p>
					<Button
						onClick={handleAccept}
						loading={isAccepting || isUserLoading}
					>
						{isLogin || isUserLoading
							? 'Принять приглашение'
							: 'Войти и принять приглашение'}
					</Button>
				</>
			) : !isLogin && !isUserLoading ? (
				<>
					<p>Войдите в аккаунт, чтобы посмотреть приглашение.</p>
					<Button onClick={openLogin}>Войти</Button>
				</>
			) : null}
			{error && (isLogin || details) && (
				<p className='manager-invitation__error'>{error}</p>
			)}
		</main>
	);
};

const ManagersPage = () => {
	const [searchParams] = useSearchParams();
	const invitationToken = searchParams.get('invitation_token');
	const dispatch = useAppDispatch();

	if (invitationToken) {
		return <ManagerInvitation token={invitationToken} />;
	}

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
