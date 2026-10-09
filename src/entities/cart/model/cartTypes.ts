import type { Product } from '@entities/product';
import type { Paginated } from '@shared/utils/pagination';

export interface CartItem {
	id: number;
	product_id: number;
	product: Product;
	quantity: number;
	final_subtotal: string;
	retail_subtotal: string;
}

export type CartResponse = Paginated<CartItem>;

export interface AddItemPayload {
	productId: number;
	isRestore?: boolean;
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
