import { $api } from '@shared/api/instance';
import type { FavoriteResponse } from '../model/favoriteTypes';

export async function getFavorite() {
	const response = await $api.get<FavoriteResponse>('/favorites');
	return response.data;
}

export async function addFavorite(productId: number) {
	await $api.post('/favorites', { product_id: productId });
}

export async function removeFavorite(itemId: number) {
	await $api.delete(`/favorites/${itemId}`);
}
