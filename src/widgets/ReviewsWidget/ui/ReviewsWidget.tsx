import { AddReviewForm } from '@features/addReview'
import './ReviewsWidget.scss'
import { ReviewsList } from '@entities/review'

export const ReviewsWidget = () => {
    return (
        <div className='reviews-widget'>
            <h4 className='reviews-widget__title'>Оставьте отзыв о товаре</h4>
            <AddReviewForm />
            <ReviewsList />
        </div>
    )
}
