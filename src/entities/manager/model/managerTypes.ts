export interface Manager {
	assignment_id: number;
	manager_user_id: number;
	email: string;
	name: string;
	patronymic: string;
	surname: string;
}

export interface Organization {
	assignment_id: number;
	organization_id: number;
	email: string;
	organization_name: string;
	inn: number;
}
