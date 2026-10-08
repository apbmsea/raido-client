import clsx from 'clsx';
import { Catalog } from '@entities/catalog';
import { ProductCard } from '@entities/product';
import { AddToCartButton } from '@features/addToCart';
import { FavoriteButton } from '@features/toggleFavorite';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Button } from '@shared/ui/Button';
import { EmptyState } from '@shared/ui/EmptyState';
import { Loader } from '@shared/ui/Loader';
import './CatalogList.scss';

const CatalogList = () => {
	const dispatch = useAppDispatch();
	const { items, view, isLoading, isError } = useAppSelector(
		state => state.catalog
	);

	if (isLoading && items.length === 0) return <Loader />;

	if (isError) {
		return (
			<EmptyState
				title='Не удалось загрузить товары'
				description='Проверьте соединение с интернетом и попробуйте ещё раз.'
				action={
					<Button
						variant='outline'
						onClick={() => dispatch(Catalog.actions.catalogRequest())}
					>
						Повторить
					</Button>
				}
			/>
		);
	}

	if (items.length === 0) {
		return (
			<EmptyState
				title='Товаров не найдено'
				description='Попробуйте изменить фильтры или поисковый запрос.'
			/>
		);
	}

	return (
		<section
			className={clsx(
				'catalog-list',
				`catalog-list--${view}`,
				// Пока грузится новая выборка, прежняя остаётся на месте приглушённой
				isLoading && 'catalog-list--loading'
			)}
			aria-busy={isLoading}
		>
			{items.map(item => (
				<ProductCard
					item={item}
					key={item.id}
					variant={view}
					cartAction={<AddToCartButton productId={item.id} />}
					favoriteAction={<FavoriteButton productId={item.id} />}
				/>
			))}
		</section>
	);
};

export default CatalogList;
