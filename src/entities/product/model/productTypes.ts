export interface ProductImage {
	image_88x88?: string;
	image_250x250?: string;
	image_500x500?: string;
	image_700x700?: string;
	order?: number;
}

export interface ProductProperty {
	name: string;
	value: string;
	unit: string;
}

export interface Product {
	id: number;
	sku?: string;
	name: string;
	description: string | null;
	category_id: number;
	subcategory_id: number;
	discount_percentage: string;
	retail_price: string;
	final_price: string;
	has_discount: boolean;
	producer: string;
	properties?: ProductProperty[];
	warranty: string;
	is_favorite: boolean;
	is_in_cart: boolean;
	in_stock: boolean;
	quantity_in_cart: number | null;
	favorite_item_id: number | null;
	cart_item_id: number | null;
	delivery_date: string | null;
	review_count?: number;
	question_count?: number;
	images: ProductImage[];
}

export interface ProductsResponse {
	total: number;
	page: number;
	limit: number;
	total_pages: number;
	category_name: string | null;
	subcategory_name: string | null;
	producer_names: string[];
	items: Product[];
}
