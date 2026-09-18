export interface OrderProduct {
	final_subtotal: string;
	id: number;
	product_id: number;
	product_image: {
		image_88x88: string;
		image_250x250: string;
		image_500x500: string;
		image_700x700: string;
	};
	order: number;
	product_name: string;
	quantity: number;
	retail_price: string;
	retail_subtotal: string;
}

export interface Order {
	created_at: string;
	final_subtotal: string;
	id: number;
	items: OrderProduct[];
	payment_status: string;
	payment_status_label: string;
	retail_subtotal: string;
	shipping: boolean;
	status: string; //заменить на enum
	status_label: string;
	support_phone: string;
	total_amount: string;
	user_id: number;
}

export interface CreateOrderPayload {
	user: {
		surname: string;
		name: string;
		patronymic: string;
		phone: string;
		date_of_birth: string;
		inn: number;
		organization_name: string;
		post: string;
	};
	shipping: boolean,
	shipping_address: string,
	cart_item_ids: number[]
}
