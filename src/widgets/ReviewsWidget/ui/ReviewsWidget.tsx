import { AddReviewForm } from '@features/addReview'
import './ReviewsWidget.scss'
import { ReviewsList, ReviewTotal } from '@entities/review'

export const ReviewsWidget = () => {
    return (
        <div className='reviews-widget'>
            <h4 className='reviews-widget__title'>Оставьте отзыв о товаре</h4>
            <div className='reviews-widget__top'>
                <AddReviewForm />
                <ReviewTotal />
            </div>
            <ReviewsList />
        </div>
    )
}
