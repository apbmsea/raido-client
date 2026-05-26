export interface Product {
	id: number;
	name: string;
	description: string;
	category_id: number;
	subcategory_id: number;
	discount_percentage: string;
	retail_price: string;
	final_price: string;
	has_discount: boolean;
	producer: string;
	warranty: string;
	is_favorite: boolean;
	favorite_item_id: number;
	delivery_date: string;
	images: {
		image_250x250?: string;
	}[];
}
