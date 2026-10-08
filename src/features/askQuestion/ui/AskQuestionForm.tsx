import { useState, type FormEvent } from 'react';
import { Question } from '@entities/question';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { Checkbox } from '@shared/ui/Checkbox';
import { TextArea } from '@shared/ui/TextArea';
import './AskQuestionForm.scss';

type AskQuestionFormProps = {
	productId: number;
};

export const AskQuestionForm = ({ productId }: AskQuestionFormProps) => {
	const dispatch = useAppDispatch();
	const { isFetch, submitError } = useAppSelector(state => state.question);

	const [comment, setComment] = useState('');
	const [isAnonymous, setIsAnonymous] = useState(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		dispatch(
			Question.actions.askQuestionRequest({
				productId,
				payload: {
					comment: comment.trim(),
					is_anonymous: isAnonymous
				}
			})
		);
	};

	return (
		<form onSubmit={handleSubmit} className='ask-question'>
			<TextArea
				name='comment'
				value={comment}
				onChange={e => setComment(e.target.value)}
				placeholder='Ваш вопрос'
				aria-label='Текст вопроса'
				required
			/>
			<Checkbox
				name='is_anonymous'
				checked={isAnonymous}
				onChange={e => setIsAnonymous(e.target.checked)}
				label='Оставить вопрос анонимно'
			/>
			{submitError && (
				<p className='ask-question__error' role='alert'>
					{submitError}
				</p>
			)}
			<Button loading={isFetch} size='s' type='submit'>
				Отправить
			</Button>
		</form>
	);
};
