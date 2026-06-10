import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useEffect, useState } from 'react';
import { Review } from '..';
import { useParams } from 'react-router-dom';
import { ReviewCard } from './ReviewCard';
import './ReviewsList.scss';
import { Button } from '@shared/ui/Button';
import MessageIcon from '@shared/icons/Message';

const fakeList = [
	{
		id: 1,
		product_id: 5283,
		rating: 5,
		comment:
			'Хороший телефон, мне понравился. Чехол и стекло шли в комплекте. Порадовала хорошая камера.',
		created_at: '2026-06-09T03:20:20.269Z',
		updated_at: '2026-06-09T03:20:20.269Z',
		first_name: 'Илья',
		last_name: 'Ефимофич'
	},
	{
		id: 2,
		product_id: 5283,
		rating: 4,
		comment:
			'Хороший телефон, мне понравился. Чехол и стекло шли в комплекте. Порадовала хорошая камера. И ещё дополнительный текст, чтобы показать отзыв в две строчки.',
		created_at: '2026-06-09T03:20:20.269Z',
		updated_at: '2026-06-09T03:20:20.269Z',
		first_name: 'Иван',
		last_name: 'Иванович'
	},
	{
		id: 3,
		product_id: 5283,
		rating: 5,
		comment:
			'Хороший телефон, мне понравился. Чехол и стекло шли в комплекте. Порадовала хорошая камера. И ещё дополнительный текст, чтобы показать отзыв в две строчки.',
		created_at: '2026-06-09T03:20:20.269Z',
		updated_at: '2026-06-09T03:20:20.269Z',
		first_name: 'Андрей',
		last_name: 'Сифонов'
	},
	{
		id: 4,
		product_id: 5283,
		rating: 3,
		comment: 'Так себе.',
		created_at: '2026-06-09T03:20:20.269Z',
		updated_at: '2026-06-09T03:20:20.269Z',
		first_name: 'Семён',
		last_name: 'Потлачёв'
	}
];

export const ReviewsList = () => {
	const dispatch = useAppDispatch();
	const { reviews, isLoading } = useAppSelector(state => state.review);

	const { id } = useParams();
	const [visibleCount, setVisibleCount] = useState(3);
	const visibleReviews = fakeList.slice(0, visibleCount);
	const handleShowMore = () => {
		setVisibleCount(prevCount => prevCount + 5);
	};

	useEffect(() => {
		if (id) {
			dispatch(Review.actions.getReviewRequest({ productId: Number(id) }));
		}
	}, [id, dispatch]);

	if (!reviews.length) {
		return (
			<div className='reviews-empty'>
				<MessageIcon className='reviews-empty__icon' size={40} />
				<span className='reviews-empty__title'>Отзывов о товаре пока нет</span>
			</div>
		);
	}

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	return (
		<div className='reviews-wrapper'>
			<div className='reviews-list'>
				{visibleReviews.map(review => (
					<ReviewCard review={review} key={review.id} />
				))}
			</div>
			{fakeList.length > visibleCount && (
				<Button size='s' variant='outline' onClick={handleShowMore}>
					Показать еще
				</Button>
			)}
		</div>
	);
};
