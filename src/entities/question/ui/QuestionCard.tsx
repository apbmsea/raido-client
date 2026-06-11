import type { QuestionType } from '..';
import './QuestionCard.scss';

type QuestionCardProps = {
	question: QuestionType;
};

export const QuestionCard = ({ question }: QuestionCardProps) => {
	const formatDate = (isoString: string) => {
		if (!isoString) return '';
		const date = new Date(isoString);
		return date.toLocaleDateString('ru-RU', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};
	return (
		<div className='question-card'>
			<div className='question-card__content'>
				<div className='question-card__information'>
					<span className='question-card__information-name'>
						{question.first_name && question.last_name ? `${question.first_name} ${question.last_name}` : "Анонимный пользователь"} 
					</span>
					<div className='question-card__information-date'>
						{formatDate(question.created_at)}
					</div>
				</div>
				<p className='question-card__content-comment'>
					{question.comment}
				</p>
			</div>
			{question.answer && (
				<div className='question-card__content question-card--answer'>
					<div className='question-card__information'>
						<span className='question-card__information-name'>
							Ответ от компании
						</span>
						{/* <div className='question-card__information-date'>
						{formatDate(question.created_at)}
					</div> */}
					</div>
					<p className='question-card__content-comment'>
						{question.answer}
					</p>
				</div>
			)}
		</div>
	);
};
