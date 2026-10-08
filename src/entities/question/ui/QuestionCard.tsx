import { Avatar } from '@shared/ui/Avatar';
import { formatDate } from '@shared/utils/formatDate';
import type { QuestionType } from '../model/questionTypes';
import './QuestionCard.scss';

type QuestionCardProps = {
	question: QuestionType;
};

export const QuestionCard = ({ question }: QuestionCardProps) => {
	const authorName = [question.first_name, question.last_name]
		.filter(Boolean)
		.join(' ');

	return (
		<article className='question-card'>
			<div className='question-card__header'>
				<Avatar name={authorName} />
				<div className='question-card__author'>
					<span className='question-card__name'>
						{authorName || 'Анонимный пользователь'}
					</span>
					<time
						className='question-card__date'
						dateTime={question.created_at}
					>
						{formatDate(question.created_at)}
					</time>
				</div>
			</div>
			<p className='question-card__comment'>{question.comment}</p>
			{question.answer && (
				<div className='question-card__answer'>
					<span className='question-card__answer-label'>
						Ответ от компании
					</span>
					<p className='question-card__comment'>{question.answer}</p>
				</div>
			)}
		</article>
	);
};
