import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import MessageIcon from '@shared/icons/Message';
import { Button } from '@shared/ui/Button';
import { EmptyState } from '@shared/ui/EmptyState';
import { LoadMore } from '@shared/ui/LoadMore';
import { Loader } from '@shared/ui/Loader';
import { actions } from '../model/reviewSlice';
import { ReviewCard } from './ReviewCard';
import './ReviewsList.scss';

const INITIAL_COUNT = 3;
const SHOW_MORE_STEP = 5;

export const ReviewsList = ({ productId }: { productId: number }) => {
	const dispatch = useAppDispatch();
	const { reviews, isLoading, paging } = useAppSelector(
		state => state.review
	);
	const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

	if (isLoading && reviews.length === 0) return <Loader />;

	if (reviews.length === 0) {
		return (
			<EmptyState
				icon={<MessageIcon size={40} />}
				title='Отзывов о товаре пока нет'
				description='Поделитесь впечатлениями — ваш отзыв будет первым.'
			/>
		);
	}

	return (
		<div className='reviews-list'>
			<div className='reviews-list__items'>
				{reviews.slice(0, visibleCount).map(review => (
					<ReviewCard review={review} key={review.id} />
				))}
			</div>
			{reviews.length > visibleCount ? (
				<Button
					size='s'
					variant='outline'
					onClick={() => setVisibleCount(count => count + SHOW_MORE_STEP)}
				>
					Показать ещё
				</Button>
			) : (
				// Всё загруженное уже раскрыто — дальше список дочитывается с сервера
				<LoadMore
					paging={paging}
					onLoadMore={() => {
						setVisibleCount(Infinity);
						dispatch(actions.getReviewMoreRequest({ productId }));
					}}
				/>
			)}
		</div>
	);
};
