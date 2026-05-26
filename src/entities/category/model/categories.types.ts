export interface Category {
	id: number;
	name: string;
	svg_icon: string;
	subcategories: SubCategory[];
}


export interface SubCategory {
	id: number;
	name: string;
	title: string | null;
}

