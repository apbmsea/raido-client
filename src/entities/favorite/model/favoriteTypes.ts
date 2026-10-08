import type { Product } from '@entities/product';
import type { Paginated } from '@shared/utils/pagination';

export interface FavoriteItem {
	/** Идентификатор записи избранного: по нему товар убирается из списка */
	id: number;
	product_id: number;
	product: Product;
}

export type FavoriteResponse = Paginated<FavoriteItem>;
