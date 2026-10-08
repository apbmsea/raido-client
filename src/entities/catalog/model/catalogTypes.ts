export type SortType = 'retail_price_asc' | 'retail_price_desc' | 'name_asc';

export type CatalogView = 'grid' | 'list';

export const SORT_OPTIONS: { label: string; value: SortType }[] = [
	{ label: 'По названию', value: 'name_asc' },
	{ label: 'По возрастанию цены', value: 'retail_price_asc' },
	{ label: 'По убыванию цены', value: 'retail_price_desc' }
];

export const DEFAULT_SORT: SortType = 'name_asc';

export const isSortType = (value: unknown): value is SortType =>
	SORT_OPTIONS.some(option => option.value === value);

export const PRICE_LIMITS = {
	minPrice: 0,
	maxPrice: 10_000_000
};
