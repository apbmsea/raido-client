import { $api } from '@shared/api/instance';

const ids = [18, 29, 123, 150, 88, 91];

export async function getOffers() {
	const id = ids[Math.floor(Math.random() * ids.length)];
	const response = await $api.get(`/products?subcategory_id=${id}`);
	return response.data;
}
