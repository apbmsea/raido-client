import { $api } from '@shared/api/instance';
import type { FavoriteResponse } from '../model/favoriteTypes';

export async function getFavorite(page = 1) {
	const response = await $api.get<FavoriteResponse>('/favorites', {
		params: { page }
	});
	return response.data;
}

export async function addFavorite(productId: number) {
	await $api.post('/favorites', { product_id: productId });
}

export async function removeFavorite(itemId: number) {
	await $api.delete(`/favorites/${itemId}`);
}
