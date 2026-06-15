export interface UserType {
	id: number;
	email: string;
	phone: null | string;
	name: null | string;
	surname: null | string;
	date_of_birth: null | string;
	is_male: null | boolean;
	is_corporate: boolean;
	inn: null | number;
	organization_name: null | string;
	bonus_balance: number;
}

export interface EditUserPayload {
	payload: {
		name?: string;
		phone?: string;
		date_of_birth?: string;
		surname?: string;
	};
}
