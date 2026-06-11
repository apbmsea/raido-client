import { Button } from '@shared/ui/Button';
import { Checkbox } from '@shared/ui/Checkbox';
import { TextArea } from '@shared/ui/TextArea';
import './AskQuestionForm.scss';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Question } from '@entities/question';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const AskQuestionForm = () => {
	const dispatch = useAppDispatch();
	const { isFetch } = useAppSelector(state => state.question);

	const { id } = useParams();

	const [formData, setFormData] = useState({
		comment: '',
		is_anonymous: false
	});

	const handleSumbit = (e: React.FormEvent) => {
		e.preventDefault();
		if (id) {
			dispatch(
				Question.actions.askQuestionRequest({
					productId: Number(id),
					payload: {
						comment: formData.comment,
						is_anonymous: formData.is_anonymous
					}
				})
			);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type } = e.target;

		setFormData(prev => ({
			...prev,
			[name]:
				type === 'checkbox'
					? (e.target as HTMLInputElement).checked
					: value
		}));
	};

	return (
		<form onSubmit={handleSumbit} className='ask-question'>
			<Checkbox
				name='is_anonymous'
				checked={formData.is_anonymous}
				onChange={handleChange}
				label='Оставить вопрос анонимно'
			/>
			<TextArea
				name='comment'
				value={formData.comment}
				onChange={handleChange}
				placeholder='Ваш вопрос'
			/>
			<Button disabled={isFetch} size='s' type='submit'>
				Отправить
			</Button>
		</form>
	);
};
