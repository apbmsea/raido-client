import { $api } from '@shared/api/instance';
import type { CreateOrderPayload } from './orderTypes';

export async function getOrders() {
	const response = await $api.get(`/orders/`);
	return response.data;
}

export async function createOrder(data: CreateOrderPayload) {
	const response = await $api.post(`/orders/from_cart_items`, data);
	return response.data;
}

