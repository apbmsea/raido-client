import { $api } from '@shared/api/instance';

export async function getProduct(id: string) {
    const response = await $api.get(`/products/${id}`);
    return response.data;
}
