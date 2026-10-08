import { $api } from '@shared/api/instance';
import type { Category } from '../model/categoryTypes';

export async function getCategories() {
	const response = await $api.get<Category[]>('/categories');
	return response.data;
}
