import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	acceptManagerInvitation,
	getManagerInvitationDetails,
	type InvitationDetails
} from '@entities/manager';
import { Modal } from '@entities/modal';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { Loader } from '@shared/ui/Loader';
import './ManagerInvitation.scss';

/** Страница приглашения стать менеджером организации — открывается из письма */
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

	// Данные приглашения перезапрашиваются после входа: гостю сервер их может не отдать
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
			setError('Не удалось принять приглашение. Попробуйте ещё раз.');
			setIsAccepting(false);
		}
	};

	if (isLoading) return <Loader text='Загружаем приглашение' />;

	return (
		<section className='manager-invitation'>
			{details ? (
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
			) : (
				!isLogin &&
				!isUserLoading && (
					<>
						<p>Войдите в аккаунт, чтобы посмотреть приглашение.</p>
						<Button onClick={openLogin}>Войти</Button>
					</>
				)
			)}
			{error && (isLogin || details) && (
				<p className='manager-invitation__error' role='alert'>
					{error}
				</p>
			)}
		</section>
	);
};

export default ManagerInvitation;
