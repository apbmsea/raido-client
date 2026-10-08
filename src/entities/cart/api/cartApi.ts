import { $api } from '@shared/api/instance';
import type { CartResponse } from '../model/cartTypes';

export async function getCart() {
	const response = await $api.get<CartResponse>('/cart');
	return response.data;
}

export async function addItemToCart(productId: number, quantity = 1) {
	await $api.post('/cart', { product_id: productId, quantity });
}

export async function updateCartItemQuantity(itemId: number, quantity: number) {
	await $api.patch(`/cart/${itemId}`, { quantity });
}

export async function removeItemFromCart(itemId: number) {
	await $api.delete(`/cart/${itemId}`);
}
