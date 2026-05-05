import { $api } from '@shared/api/instance';

export async function search(query: string) {
    const response = await $api.get(`/categories/search?search_request=${query}`);
    return response.data;
}
