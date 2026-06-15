import { Button } from '@shared/ui/Button';
import { Checkbox } from '@shared/ui/Checkbox';
import { TextArea } from '@shared/ui/TextArea';
import './AddReviewForm.scss';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RatingInput } from '@shared/ui/RatingInput';
import { Review } from '@entities/review';
import { UnauthWidget } from '@widgets/UnauthWidget';

export const AddReviewForm = () => {
	const dispatch = useAppDispatch();
	const { isFetch } = useAppSelector(state => state.question);
	const { isLogin } = useAppSelector(state => state.user);

	const { id } = useParams();

	const [formData, setFormData] = useState({
		comment: '',
		is_anonymous: false,
		rating: 0
	});

	if (!isLogin) {
		return (
			<div
				style={{
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<UnauthWidget message='Войдите в профиль, чтобы оставить отзыв' />{' '}
			</div>
		);
	}

	const handleSumbit = (e: React.FormEvent) => {
		e.preventDefault();
		if (id) {
			dispatch(
				Review.actions.addReviewRequest({
					productId: Number(id),
					payload: {
						comment: formData.comment,
						rating: formData.rating,
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
		<form onSubmit={handleSumbit} className='add-review'>
			<Checkbox
				name='is_anonymous'
				checked={formData.is_anonymous}
				onChange={handleChange}
				label='Оставить отзыв анонимно'
			/>
			<RatingInput
				value={formData.rating}
				onChange={value =>
					setFormData(prev => ({ ...prev, rating: value }))
				}
			/>

			<TextArea
				name='comment'
				value={formData.comment}
				onChange={handleChange}
				placeholder='Опишите товар'
			/>
			<Button disabled={isFetch} size='s' type='submit'>
				Отправить
			</Button>
		</form>
	);
};
