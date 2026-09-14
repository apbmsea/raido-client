import type { Product } from '@entities/catalog/model/catalog.type';

export interface AddItemToCartPayload {
	payload: {
		product_id: number;
		quantity: number;
	};
}

export interface SetSelectedItemsPayload {
	selectedItems: CartItem[];
	totalSum: number;
	totalSelectedItems: number;
}

export interface CartItem {
	final_subtotal: string;
	id: number;
	product: Product;
	product_id: number;
	quantity: number;
	retail_subtotal: string;
}
