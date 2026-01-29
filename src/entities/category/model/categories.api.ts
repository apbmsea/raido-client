import { $api } from '@shared/api/instance';

export async function getCategories() {
	const response = await $api.get('/categories');
    return response.data
}