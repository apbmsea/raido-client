import { $api } from '@shared/api/instance';
import type { AddItemToCartPayload } from './cartType';

export async function addItemToCart(data: AddItemToCartPayload) {
    await $api.post(`/cart`, data.payload);
}

export async function getCart() {
    await $api.get(`/cart`);
}
