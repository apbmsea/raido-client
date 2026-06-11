import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useEffect, useState } from 'react';
import { Question } from '..';
import { useParams } from 'react-router-dom';
import { QuestionCard } from './QuestionCard';
import './QuestionsList.scss';
import { Button } from '@shared/ui/Button';
import MessageIcon from '@shared/icons/Message';

export const QuestionsList = () => {
	const dispatch = useAppDispatch();
	const { questions, isLoading } = useAppSelector(state => state.question);
	const { id } = useParams();
	const [visibleCount, setVisibleCount] = useState(3);
	const visibleQuestions = questions.slice(0, visibleCount);
	const handleShowMore = () => {
		setVisibleCount(prevCount => prevCount + 5);
	};

	useEffect(() => {
		if (id) {
			dispatch(
				Question.actions.getQuestionRequest({ productId: Number(id) })
			);
		}
	}, [id, dispatch]);

	if (!questions.length) {
		return (
			<div className='questions-empty'>
				<MessageIcon className='questions-empty__icon' size={40} />
				<span className='questions-empty__title'>
					Вопросов о товаре пока нет
				</span>
			</div>
		);
	}

	if (isLoading) {
		return <div>Загрузка...</div>; //заменить на лоадер
	}

	return (
		<div className='questions-wrapper'>
			<div className='questions-list'>
				{visibleQuestions.map(question => (
					<QuestionCard question={question} key={question.id} />
				))}
			</div>
			{questions.length > visibleCount && (
				<Button size='s' variant='outline' onClick={handleShowMore}>
					Показать еще
				</Button>
			)}
		</div>
	);
};
