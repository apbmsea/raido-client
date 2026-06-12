import { useParams } from 'react-router-dom';
import './ProductPage.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Product } from '..';
import { Button } from '@shared/ui/Button';
import CartIcon from '@shared/icons/Cart';
import FavoriteIcon from '@shared/icons/Favorite';
import { IconButton } from '@shared/ui/IconButton';
import SharedIcon from '@shared/icons/Shared';
import { ImageGallery } from '../features/imageGallery';
import Tabs, { type TabItem } from '@shared/ui/Tabs/ui/Tabs';
import { ProductFeatures } from '../features/productFeatures';
import { QuestionsWidget } from '@widgets/QuestionsWidget';
import { ReviewsWidget } from '@widgets/ReviewsWidget';

type ProductTabType = 'features' | 'reviews' | 'questions';


const ProductPage = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const item = useAppSelector(state => state.product.item);
	const orginalReviewCount = useAppSelector(state => state.review.total);
	const orginalQuestionsCount = useAppSelector(state => state.question.total);
	const [activeTab, setActiveTab] = useState<ProductTabType>('features');

	const PRODUCT_TABS: TabItem<ProductTabType>[] = [
		{ id: 'features', label: 'Характеристики' },
		{ id: 'reviews', label: 'Отзывы', count: orginalReviewCount || item?.review_count },
		{ id: 'questions', label: 'Вопросы', count: orginalQuestionsCount || item?.question_count }
	];


	const tabContent: Record<ProductTabType, React.ReactNode> = {
		features: <ProductFeatures />,
		reviews: <ReviewsWidget />,
		questions: <QuestionsWidget />
	};

	useEffect(() => {
		if (id) {
			dispatch(Product.actions.productRequest({ id }));
		}
		console.log('1');
	}, []);

	if (!item) {
		return <main className='product-page'>Загрузка...</main>;
	}

	return (
		<main className='product-page'>
			<section className='product-page__product'>
				<ImageGallery images={item.images} />
				<div className='product-page__content'>
					<h2 className='product-page__content-name'>{item.name}</h2>
					<div style={{ height: '100%' }}>Секция выбора данных</div>
					<div className='product-page__content-prices'>
						<span className='product-page__content-finalprice'>
							{new Intl.NumberFormat('ru-RU', {
								style: 'currency',
								currency: 'RUB',
								minimumFractionDigits: 0
							}).format(Number(item.final_price))}
						</span>
						<span className='product-page__content-retailprice'>
							{new Intl.NumberFormat('ru-RU', {
								style: 'currency',
								currency: 'RUB',
								minimumFractionDigits: 0,
								maximumFractionDigits: 0
							}).format(
								Number(
									item.retail_price === ''
										? Number(item.final_price) * 1.25
										: item.retail_price
								)
							)}
						</span>
						<span className='product-page__content-discount'>
							{item.discount_percentage === '' || "0"
								? '25'
								: `${item.discount_percentage}`}
							%
						</span>
					</div>
					<div className='product-page__buttons'>
						<Button size='l' rightIcon={<CartIcon />}>
							В корзину
						</Button>
						<IconButton icon={<FavoriteIcon size={24} />} />
						<IconButton icon={<SharedIcon size={24} />} />
					</div>
				</div>
			</section>
			<section>
				<div className='product-widget' style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
					<Tabs
						items={PRODUCT_TABS}
						activeTab={activeTab}
						onChange={setActiveTab}
					/>
					<div className='product-widget__content'>
						{tabContent[activeTab]}
					</div>
				</div>
			</section>

			{/* оставить только для пк */}
		</main>
	);
};

export default ProductPage;
