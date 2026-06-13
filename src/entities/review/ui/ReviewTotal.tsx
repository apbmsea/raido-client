import { useAppSelector } from '@shared/hooks/store.hooks'
import { RatingStars } from '@shared/ui/RatingStars'
import './ReviewTotal.scss'

export const ReviewTotal = () => {
  const { rating, total, counts_of_reviews } = useAppSelector((state) => state.review)
  const ratingLevels = [5, 4, 3, 2, 1] as const

  if (total === 0) return null

  return (
    <div className="review-total">
      <div className="review-total__information">
        <h2 className="review-total__information-title">{rating}</h2>
        <RatingStars rating={rating} />
      </div>

      <div className="review-total__histogram">
        {ratingLevels.map((level) => {
          const count = counts_of_reviews?.[level] || 0
          const percent = total > 0 ? Math.round((count / total) * 100) : 0

          return (
            <div key={level} className="review-total__row">
              <span className="review-total__num">{level}</span>
              <div className="review-total__progress-bg">
                <div
                  className="review-total__progress-fill"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}