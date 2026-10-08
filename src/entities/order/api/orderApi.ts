import { $api } from '@shared/api/instance';
import type {
	CreateOrderPayload,
	OrderDetails,
	OrdersResponse
} from '../model/orderTypes';

export async function getOrders() {
	const response = await $api.get<OrdersResponse>('/orders/');
	return response.data;
}

export async function getOrderById(orderId: string) {
	const response = await $api.get<OrderDetails>(`/orders/${orderId}`);
	return response.data;
}

export async function createOrder(payload: CreateOrderPayload) {
	const response = await $api.post<{ id?: number } | null>(
		'/orders/from_cart_items',
		payload
	);
	return response.data;
}
