import type { Product } from '@entities/product';

export interface CartItem {
	/** Идентификатор позиции корзины: по нему позиция меняется и удаляется */
	id: number;
	product_id: number;
	product: Product;
	quantity: number;
	final_subtotal: string;
	retail_subtotal: string;
}

export interface CartResponse {
	items: CartItem[];
	total: number;
}

export interface AddItemPayload {
	productId: number;
}

export interface ChangeQuantityPayload {
	itemId: number;
	productId: number;
	quantity: number;
}

export interface RemoveItemPayload {
	itemId: number;
	productId: number;
}
