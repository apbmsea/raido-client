import { $api } from '@shared/api/instance';
import type { CreateOrderPayload, OrderDetails } from './orderTypes';

export async function getOrders() {
	const response = await $api.get(`/orders/`);
	return response.data;
}

export async function getOrderById(orderId: string) {
	const response = await $api.get<OrderDetails>(`/orders/${orderId}`);
	return response.data;
}

export async function createOrder({
	user,
	shipping,
	shipping_address,
	cart_item_ids,
	comment,
	comment_delivery,
	terms,
	use_bonus
}: CreateOrderPayload) {
	const response = await $api.post(`/orders/from_cart_items`, {
		user,
		shipping,
		shipping_address,
		cart_item_ids,
		comment,
		comment_delivery,
		terms,
		use_bonus
	});
	return response.data;
}

