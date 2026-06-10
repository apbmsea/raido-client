import { ReviewsList } from '@entities/review';
import { AddReviewForm } from '@features/addReview/ui/AddReviewForm';

const ProductReviews = () => {
	return (
		<div>
			<h4>Оставьте отзыв о товаре</h4>
			<div style={{ display: "flex", flexDirection: "column", gap: "40px"}}>
				<AddReviewForm />
				<ReviewsList />
			</div>
			<div></div>
		</div>
	);
};

export default ProductReviews;
