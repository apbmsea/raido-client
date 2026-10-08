import { $api } from '@shared/api/instance';
import type { SearchSuggestion } from '../model/searchTypes';

export async function searchSuggestions(query: string) {
	const response = await $api.get<SearchSuggestion[]>('/categories/search', {
		params: { search_request: query }
	});
	return response.data;
}
