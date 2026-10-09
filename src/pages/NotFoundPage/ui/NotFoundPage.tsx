import { useNavigate } from 'react-router-dom';
import { Button } from '@shared/ui/Button';
import { usePageTitle } from '@shared/hooks/usePageTitle.hook';
import './NotFoundPage.scss';

const NotFoundPage = () => {
	usePageTitle('Страница не найдена', { noindex: true });

	const navigate = useNavigate();

	return (
		<main className='not-found-page'>
			<div className='not-found-page__code' aria-hidden='true'>
				404
			</div>
			<h1 className='not-found-page__title'>Страница не найдена</h1>
			<p className='not-found-page__text'>
				К сожалению, неверно набран адрес или такой страницы на сайте не
				существует.
			</p>
			<Button onClick={() => navigate('/')}>На главную</Button>
		</main>
	);
};

export default NotFoundPage;
