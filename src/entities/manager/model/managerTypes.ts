export interface ManagerType {
	assignment_id: number;
	manager_user_id: number;
	email: string;
	name: string | null;
	patronymic: string | null;
	surname: string | null;
}

export interface OrganizationType {
	assignment_id: number;
	organization_id: number;
	email: string;
	organization_name: string;
	inn: number;
}

export interface InvitationDetails {
	organization_name: string;
	organization_email: string;
}
