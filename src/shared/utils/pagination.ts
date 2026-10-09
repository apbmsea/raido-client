export interface Paginated<T> {
	items: T[];
	total: number;
	page: number;
	total_pages: number;
}

export interface PagingState {
	page: number;
	totalPages: number;
	isLoadingMore: boolean;
	isLoadMoreError: boolean;
}

export const initialPaging: PagingState = {
	page: 1,
	totalPages: 1,
	isLoadingMore: false,
	isLoadMoreError: false
};

export const toPaging = (response: {
	page: number;
	total_pages: number;
}): PagingState => ({
	...initialPaging,
	page: response.page || 1,
	totalPages: response.total_pages || 1
});

export const hasNextPage = (paging: PagingState) =>
	paging.page < paging.totalPages;

export const startNextPage = (paging: PagingState) => {
	paging.isLoadingMore = true;
	paging.isLoadMoreError = false;
};

export const failNextPage = (paging: PagingState) => {
	paging.isLoadingMore = false;
	paging.isLoadMoreError = true;
};

export const applyNextPage = <T extends { id: number }>(
	paging: PagingState,
	items: T[],
	response: Paginated<T>
) => {
	paging.isLoadingMore = false;

	if (response.page !== paging.page + 1) return;

	const knownIds = new Set(items.map(item => item.id));
	items.push(...response.items.filter(item => !knownIds.has(item.id)));

	paging.page = response.page;
	paging.totalPages = response.total_pages || 1;
};

export async function fetchPages<T, R extends Paginated<T>>(
	fetchPage: (page: number) => Promise<R>,
	pageCount: number
): Promise<R> {
	let response = await fetchPage(1);
	const items = [...response.items];

	while (response.page < Math.min(pageCount, response.total_pages)) {
		response = await fetchPage(response.page + 1);
		items.push(...response.items);
	}

	return { ...response, items };
}
