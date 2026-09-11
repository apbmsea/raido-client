import { $api } from '@shared/api/instance';

export async function getFavorite() {
	const response = await $api.get(`/favorites`);
	return response.data;
}

export async function addFavorite(productId: number) {
	const response = await $api.post(`/favorites`, { product_id: productId });
	return response.data;
}

export async function removeFavorite(productId: number) {
	const response = await $api.delete(`/favorites/${productId}`);
	return response.data;
}
