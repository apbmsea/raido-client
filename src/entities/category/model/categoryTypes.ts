export interface SubCategory {
	id: number;
	name: string;
	/** Заголовок группы, в которую подкатегория входит внутри категории */
	title: string | null;
}

export interface Category {
	id: number;
	name: string;
	svg_icon: string;
	subcategories: SubCategory[];
}
