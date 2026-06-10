import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Review } from '@entities/review';
import { Button } from '@shared/ui/Button';
import { StarRating } from '@shared/ui/StarRating';
import { TextArea } from '@shared/ui/TextArea';

interface ReviewFormState {
	rating: number;
	comment: string;
}

interface FormErrorsState {
	rating: string;
	comment: string;
}

export const AddReviewForm = () => {
	const dispatch = useAppDispatch();
	const { id: productId } = useParams<{ id: string }>();

	// Берем состояние загрузки из сущности отзыва, чтобы делать лоадер на кнопке
	const { isLoading } = useAppSelector(state => state.review);

	const [formData, setFormData] = useState<ReviewFormState>({
		rating: 0,
		comment: ''
	});

	const [errors, setErrors] = useState<Partial<FormErrorsState>>({});
	const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] =
		useState(false);

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData(prev => ({ ...prev, comment: e.target.value }));
		if (errors.comment) {
			setErrors(prev => ({ ...prev, comment: undefined }));
		}
	};

	const handleRatingChange = (newRating: number) => {
		setFormData(prev => ({ ...prev, rating: newRating }));
		if (errors.rating) {
			setErrors(prev => ({ ...prev, rating: undefined }));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!productId) {
			console.error('Product ID не найден в URL');
			return;
		}

		const newErrors: Partial<FormErrorsState> = {};
		if (formData.rating === 0) {
			newErrors.rating = 'Пожалуйста, выберите оценку';
		}
		if (!formData.comment.trim()) {
			newErrors.comment = 'Пожалуйста, напишите текст отзыва';
		} else if (formData.comment.trim().length < 10) {
			newErrors.comment = 'Минимальная длина отзыва — 10 символов';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
		dispatch(
			Review.actions.addReviewRequest({
				productId: Number(productId),
				payload: {
					rating: formData.rating,
					comment: formData.comment,
					is_anonymous: false
				}
			})
		);

		setIsSubmittedSuccessfully(true);
	};

	useEffect(() => {
		if (
			!isLoading &&
			isSubmittedSuccessfully &&
			Object.keys(errors).length === 0
		) {
			setFormData({ rating: 0, comment: '' });
			setIsSubmittedSuccessfully(false);
		}
	}, [isLoading, isSubmittedSuccessfully, errors]);

	return (
		<form onSubmit={handleSubmit} noValidate>
			<h3
				style={{
					margin: 0,
					fontSize: '20px',
					fontWeight: 600,
					color: '#111827'
				}}
			>
				Оставить отзыв
			</h3>

			<StarRating
				label='Ваша оценка'
				value={formData.rating}
				onChange={handleRatingChange}
				error={errors.rating}
				disabled={isLoading}
			/>

			<TextArea
				label='Ваш комментарий'
				placeholder='Поделитесь впечатлениями о товаре: что понравилось, а что можно улучшить?'
				value={formData.comment}
				onChange={handleTextChange}
				error={errors.comment}
				disabled={isLoading}
				rows={5}
			/>

			<Button type='submit' disabled={isLoading}>
				{isLoading ? 'Отправка...' : 'Отправить'}
			</Button>
		</form>
	);
};
