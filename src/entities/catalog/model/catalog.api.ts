import { $api } from '@shared/api/instance';

export async function getProducts(link: string) {
	const response = await $api.get(`/products?${link}`);
	return response.data;
}
