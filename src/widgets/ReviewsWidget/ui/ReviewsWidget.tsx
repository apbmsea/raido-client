import { ReviewsList, ReviewTotal } from '@entities/review';
import { AddReviewForm } from '@features/addReview';
import { AuthPrompt } from '@features/auth';
import { useAppSelector } from '@shared/hooks/store.hooks';
import './ReviewsWidget.scss';

export const ReviewsWidget = ({ productId }: { productId: number }) => {
	const isLogin = useAppSelector(state => state.user.isLogin);
	const submittedCount = useAppSelector(state => state.review.submittedCount);

	return (
		<div className='reviews-widget'>
			<div className='reviews-widget__main'>
				<ReviewsList productId={productId} />
			</div>
			<aside className='reviews-widget__aside'>
				<ReviewTotal />
				<div className='reviews-widget__form'>
					<h3 className='reviews-widget__title'>
						Оставьте отзыв о товаре
					</h3>
					{isLogin ? (
						<AddReviewForm key={submittedCount} productId={productId} />
					) : (
						<AuthPrompt message='Войдите в профиль, чтобы оставить отзыв' />
					)}
				</div>
			</aside>
		</div>
	);
};
