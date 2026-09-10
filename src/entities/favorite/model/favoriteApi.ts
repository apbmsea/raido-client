import { $api } from '@shared/api/instance';

export async function getFavorite() {
    const response = await $api.get(`/favorites`);
    return response.data
}
