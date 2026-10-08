import { useState, type FormEvent } from 'react';
import { Review } from '@entities/review';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { Checkbox } from '@shared/ui/Checkbox';
import { RatingInput } from '@shared/ui/RatingInput';
import { TextArea } from '@shared/ui/TextArea';
import './AddReviewForm.scss';

type AddReviewFormProps = {
	productId: number;
};

export const AddReviewForm = ({ productId }: AddReviewFormProps) => {
	const dispatch = useAppDispatch();
	const { isFetch, submitError } = useAppSelector(state => state.review);

	const [comment, setComment] = useState('');
	const [isAnonymous, setIsAnonymous] = useState(false);
	const [rating, setRating] = useState(0);
	const [isRatingMissing, setIsRatingMissing] = useState(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (rating === 0) {
			setIsRatingMissing(true);
			return;
		}

		dispatch(
			Review.actions.addReviewRequest({
				productId,
				payload: {
					comment: comment.trim(),
					rating,
					is_anonymous: isAnonymous
				}
			})
		);
	};

	return (
		<form onSubmit={handleSubmit} className='add-review'>
			<RatingInput
				label='Ваша оценка'
				value={rating}
				onChange={value => {
					setRating(value);
					setIsRatingMissing(false);
				}}
				error={isRatingMissing ? 'Поставьте оценку товару' : undefined}
			/>
			<TextArea
				name='comment'
				value={comment}
				onChange={e => setComment(e.target.value)}
				placeholder='Расскажите о товаре'
				aria-label='Текст отзыва'
			/>
			<Checkbox
				name='is_anonymous'
				checked={isAnonymous}
				onChange={e => setIsAnonymous(e.target.checked)}
				label='Оставить отзыв анонимно'
			/>
			{submitError && (
				<p className='add-review__error' role='alert'>
					{submitError}
				</p>
			)}
			<Button loading={isFetch} size='s' type='submit'>
				Отправить
			</Button>
		</form>
	);
};
