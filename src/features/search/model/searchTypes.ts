export type SearchSuggestion = {
	id: number;
	type: 'category' | 'subcategory';
	svg_icon: string;
	title: string;
	top_category_id: number | null;
	top_category_title: string | null;
};
