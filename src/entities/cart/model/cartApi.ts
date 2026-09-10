import { $api } from '@shared/api/instance';

import type { AddItemToCartPayload } from './cartType';

export async function addItemToCart(data: AddItemToCartPayload) {
	await $api.post('/cart', data.payload);
}

export async function getCart() {
	const response = await $api.get('/cart');

	return response.data;
}

export async function updateCartItemQuantity(
	productId: number,
	quantity: number
) {
	await $api.patch(`/cart/${productId}`, {
		quantity
	});
}

export async function removeItemFromCart(productId: number) {
	await $api.delete(`/cart/${productId}`);
}
