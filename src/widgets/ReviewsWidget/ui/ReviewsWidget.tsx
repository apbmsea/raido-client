import { AddReviewForm } from '@features/addReview'
import './ReviewsWidget.scss'
import { ReviewsList, ReviewTotal } from '@entities/review'
import { useAppSelector } from '@shared/hooks/store.hooks'
import { Loader } from '@shared/ui/Loader'

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
