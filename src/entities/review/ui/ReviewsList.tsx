import { useState } from 'react';
import { useAppSelector } from '@shared/hooks/store.hooks';
import MessageIcon from '@shared/icons/Message';
import { Button } from '@shared/ui/Button';
import { EmptyState } from '@shared/ui/EmptyState';
import { Loader } from '@shared/ui/Loader';
import { ReviewCard } from './ReviewCard';
import './ReviewsList.scss';

const INITIAL_COUNT = 3;
const SHOW_MORE_STEP = 5;

export const ReviewsList = () => {
	const { reviews, isLoading } = useAppSelector(state => state.review);
	const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

	if (isLoading && reviews.length === 0) return <Loader />;

	if (reviews.length === 0) {
		return (
			<EmptyState
				variant='compact'
				icon={<MessageIcon size={40} />}
				title='Отзывов о товаре пока нет'
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
			{reviews.length > visibleCount && (
				<Button
					size='s'
					variant='outline'
					onClick={() => setVisibleCount(count => count + SHOW_MORE_STEP)}
				>
					Показать ещё
				</Button>
			)}
		</div>
	);
};
