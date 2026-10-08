import { $api } from '@shared/api/instance';
import type { Product, ProductsResponse } from '../model/productTypes';

export async function getProducts(queryString: string) {
	const response = await $api.get<ProductsResponse>(
		`/products?${queryString}`
	);
	return response.data;
}

export async function getProduct(id: string) {
	const response = await $api.get<Product>(`/products/${id}`);
	return response.data;
}
