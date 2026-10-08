import { useEffect, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
	getDeliveryDate,
	getDiscountPercent,
	ProductDetails,
	type Product
} from '@entities/product';
import { Question } from '@entities/question';
import { Review } from '@entities/review';
import { AddToCartButton } from '@features/addToCart';
import { FavoriteButton } from '@features/toggleFavorite';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import SharedIcon from '@shared/icons/Shared';
import { Breadcrumbs } from '@shared/ui/Breadcrumbs';
import { EmptyState } from '@shared/ui/EmptyState';
import { IconButton } from '@shared/ui/IconButton';
import { Loader } from '@shared/ui/Loader';
import { Tabs, type TabItem } from '@shared/ui/Tabs';
import { formatPrice } from '@shared/utils/formatPrice';
import { QuestionsWidget } from '@widgets/QuestionsWidget';
import { ReviewsWidget } from '@widgets/ReviewsWidget';
import ImageGallery from './ImageGallery';
import ProductFeatures from './ProductFeatures';
import './ProductPage.scss';
import { OffersWidget } from '@widgets/OffersWidget';

type ProductTab = 'features' | 'reviews' | 'questions';

const COPIED_NOTICE_MS = 2000;

const ProductView = ({ item }: { item: Product }) => {
	const reviewCount = useAppSelector(state => state.review.total);
	const questionCount = useAppSelector(state => state.question.total);
	const [activeTab, setActiveTab] = useState<ProductTab>('features');
	const [isLinkCopied, setIsLinkCopied] = useState(false);

	const discountPercent = getDiscountPercent(item);
	const deliveryDate = getDeliveryDate(item);

	// Пока отзывы и вопросы грузятся, счётчики берём из самого товара
	const tabs: TabItem<ProductTab>[] = [
		{ id: 'features', label: 'Характеристики' },
		{
			id: 'reviews',
			label: 'Отзывы',
			count: reviewCount || item.review_count
		},
		{
			id: 'questions',
			label: 'Вопросы',
			count: questionCount || item.question_count
		}
	];

	const tabContent: Record<ProductTab, ReactNode> = {
		features: <ProductFeatures properties={item.properties ?? []} />,
		reviews: <ReviewsWidget productId={item.id} />,
		questions: <QuestionsWidget productId={item.id} />
	};

	useEffect(() => {
		if (!isLinkCopied) return;

		const timer = setTimeout(
			() => setIsLinkCopied(false),
			COPIED_NOTICE_MS
		);
		return () => clearTimeout(timer);
	}, [isLinkCopied]);

	const handleShare = async () => {
		const url = window.location.href;

		try {
			// На телефонах откроется системное меню «Поделиться»
			if (navigator.share) {
				await navigator.share({ title: item.name, url });
			} else {
				await navigator.clipboard.writeText(url);
				setIsLinkCopied(true);
			}
		} catch {
			// Пользователь закрыл меню или браузер запретил доступ к буферу
		}
	};

	const details = [
		{ label: 'Код товара', value: item.sku },
		{ label: 'Производитель', value: item.producer },
		{ label: 'Гарантия', value: item.warranty },
		{
			label: 'Наличие',
			value: item.in_stock
				? deliveryDate
					? `В наличии, доставка: ${deliveryDate}`
					: 'В наличии'
				: 'Нет в наличии'
		}
	].filter(detail => detail.value);

	return (
		<>
			<section className='product-page__product'>
				<ImageGallery images={item.images} alt={item.name} />

				<div className='product-page__info'>
					<h1 className='product-page__name'>{item.name}</h1>

					{details.length > 0 && (
						<div className='product-page__summary'>
							<h2 className='product-page__summary-title'>
								Информация о товаре
							</h2>

							<dl className='product-page__details'>
								{details.map(detail => (
									<div
										className='product-page__detail'
										key={detail.label}
									>
										<dt>{detail.label}</dt>
										<dd>{detail.value}</dd>
									</div>
								))}
							</dl>
						</div>
					)}

					<div className='product-page__prices'>
						<span className='product-page__price'>
							{formatPrice(item.final_price)}
						</span>
						{discountPercent && (
							<>
								<span className='product-page__old-price'>
									{formatPrice(item.retail_price)}
								</span>
								<span className='product-page__discount'>
									−{discountPercent}%
								</span>
							</>
						)}
					</div>

					<div className='product-page__actions'>
						<AddToCartButton productId={item.id} size='l' />
						<FavoriteButton productId={item.id} size='l' />
						<IconButton
							icon={<SharedIcon size={24} />}
							onClick={handleShare}
							aria-label='Поделиться'
						/>
						{isLinkCopied && (
							<span
								className='product-page__copied'
								role='status'
							>
								Ссылка скопирована
							</span>
						)}
					</div>
				</div>
			</section>

			<section className='product-page__tabs'>
				<Tabs
					items={tabs}
					activeTab={activeTab}
					onChange={setActiveTab}
				/>
				{tabContent[activeTab]}
			</section>
			<OffersWidget />
		</>
	);
};

const ProductPage = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const { item, isError } = useAppSelector(state => state.product);

	useEffect(() => {
		if (!id) return;

		const productId = Number(id);

		dispatch(ProductDetails.actions.productRequest({ id }));
		dispatch(Review.actions.getReviewRequest({ productId }));
		dispatch(Question.actions.getQuestionRequest({ productId }));

		return () => {
			dispatch(Review.actions.clearReviews());
			dispatch(Question.actions.clearQuestions());
		};
	}, [id, dispatch]);

	// В сторе может лежать товар с предыдущей страницы, пока не пришёл новый
	const product = item && String(item.id) === id ? item : null;

	if (isError && !product) {
		return (
			<main className='product-page'>
				<EmptyState
					title='Не удалось загрузить товар'
					description='Возможно, он снят с продажи или ссылка устарела.'
					action={
						<Link className='product-page__link' to='/'>
							На главную
						</Link>
					}
				/>
			</main>
		);
	}

	if (!product) {
		return (
			<main className='product-page'>
				<Loader />
			</main>
		);
	}

	return (
		<main className='product-page'>
			<Breadcrumbs
				items={[{ label: 'Главная', to: '/' }, { label: product.name }]}
			/>
			{/* key сбрасывает вкладку и состояние при переходе к другому товару */}
			<ProductView key={product.id} item={product} />
		</main>
	);
};

export default ProductPage;
