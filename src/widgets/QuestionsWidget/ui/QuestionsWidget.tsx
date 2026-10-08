import { QuestionsList } from '@entities/question';
import { AskQuestionForm } from '@features/askQuestion';
import { AuthPrompt } from '@features/auth';
import { useAppSelector } from '@shared/hooks/store.hooks';
import './QuestionsWidget.scss';

export const QuestionsWidget = ({ productId }: { productId: number }) => {
	const isLogin = useAppSelector(state => state.user.isLogin);
	// После отправки вопроса счётчик меняется, и форма пересоздаётся пустой
	const submittedCount = useAppSelector(
		state => state.question.submittedCount
	);

	return (
		<div className='questions-widget'>
			<div className='questions-widget__main'>
				<QuestionsList productId={productId} />
			</div>
			<aside className='questions-widget__form'>
				<h3 className='questions-widget__title'>Задайте вопрос о товаре</h3>
				{isLogin ? (
					<AskQuestionForm key={submittedCount} productId={productId} />
				) : (
					<AuthPrompt message='Войдите в профиль, чтобы задать вопрос' />
				)}
			</aside>
		</div>
	);
};
