export interface OrderProduct {
	final_subtotal: string;
	id: number;
	product_id: number;
	product_image: {
		image_88x88: string;
		image_250x250: string;
		image_500x500: string;
		image_700x700: string;
		order: number;
	} | null;
	product_name: string;
	quantity: number;
	retail_price: string;
	retail_subtotal: string;
}

export interface OrderType {
	created_at: string;
	final_subtotal: string;
	id: number;
	items: OrderProduct[];
	payment_status: string;
	payment_status_label: string;
	retail_subtotal: string;
	shipping: boolean;
	status: string;
	status_label: string;
	support_phone: string;
	total_amount: string;
	user_id: number;
}

export interface OrderDetails extends OrderType {
	comment: string;
	created_by_manager: boolean;
	manager_email: string;
	manager_name: string;
	manager_patronymic: string;
	manager_surname: string;
	is_organization_order: boolean;
	organization_name: string;
	receipt_code: string;
	shipping_address: string;
}

export interface OrdersResponse {
	items: OrderType[];
	total: number;
}

export interface CreateOrderPayload {
	user: {
		surname: string;
		name: string;
		patronymic: string;
		phone: string;
		date_of_birth: string;
		inn?: number;
		organization_name?: string;
		post?: string;
	};
	organization_id?: number;
	shipping: boolean;
	shipping_address: string;
	cart_item_ids: number[];
	comment: string;
	comment_delivery: string;
	terms: boolean;
	use_bonus: boolean;
}
