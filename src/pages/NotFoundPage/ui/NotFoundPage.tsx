import { Button } from '@shared/ui/Button';
import './NotFoundPage.scss'
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate()

	return (
		<main className='not-found-page'>
			<div className='not-found-page__code'>404</div>
			<h2 className='not-found-page__title'>Страница не найдена</h2>
			<p className='not-found-page__text'>
				К сожалению, неверно набран адрес или такой страницы на сайте не
				существует.
			</p>
            <Button onClick={() => navigate('/')}>На главную</Button>
		</main>
	);
};

export default NotFoundPage;
