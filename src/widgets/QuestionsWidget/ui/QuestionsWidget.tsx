import { QuestionsList } from '@entities/question';
import { AskQuestionForm } from '@features/askQuestion';
import './QuestionWidget.scss';

export const QuestionsWidget = () => {
	return (
		<div className='question-widget'>
			<h4 className='question-widget__title'>Задайте вопрос о товаре</h4>
			<AskQuestionForm />
			<QuestionsList />
		</div>
	);
};
