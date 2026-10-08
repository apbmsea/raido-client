import { $api } from '@shared/api/instance';
import type {
	InvitationDetails,
	ManagerType,
	OrganizationType
} from '../model/managerTypes';

export async function getManagers() {
	const response = await $api.get<ManagerType[]>('/organization/managers');
	return response.data;
}

export async function getManagedOrganizations() {
	const response = await $api.get<OrganizationType[]>(
		'/managed-organizations'
	);
	return response.data;
}

export async function addManager(email: string) {
	await $api.post('/manager-invitations', { email });
}

export async function getManagerInvitationDetails(invitationToken: string) {
	const response = await $api.get<InvitationDetails>(
		'/manager-invitations/details',
		{ params: { invitation_token: invitationToken } }
	);
	return response.data;
}

export async function acceptManagerInvitation(invitationToken: string) {
	await $api.post('/manager-invitations/accept', {
		invitation_token: invitationToken
	});
}

export async function removeManager(assignmentId: number) {
	await $api.delete(`/manager-assignments/${assignmentId}`);
}
