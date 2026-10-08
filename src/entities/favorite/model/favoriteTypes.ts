import type { Product } from '@entities/product';

export interface FavoriteItem {
	/** Идентификатор записи избранного: по нему товар убирается из списка */
	id: number;
	product_id: number;
	product: Product;
}

export interface FavoriteResponse {
	items: FavoriteItem[];
	total: number;
}
