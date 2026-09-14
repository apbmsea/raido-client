import { $api } from '@shared/api/instance';

export async function getOrders() {
	const response = await $api.get(`/orders/`);
	return response.data;
}
