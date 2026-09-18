export interface UserType {
	id: number;
	email: string;
	phone: null | string;
	name: null | string;
	surname: null | string;
	patronymic: null | string;
	date_of_birth: null | string;
	is_male: null | boolean;
	is_corporate: boolean;
	inn: null | number;
	organization_name: null | string;
	bonus_balance: number;
	post: string;
}

export interface EditUserPayload {
	payload: {
		phone?: null | string;
		name?: null | string;
		surname?: null | string;
		patronymic?: null | string;
		date_of_birth?: null | string;
		inn?: null | number;
		organization_name?: null | string;
		post?: string;
	};
}
