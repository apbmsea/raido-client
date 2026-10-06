import { $api } from '@shared/api/instance';

export async function getManagers() {
	const response = await $api.get(`/organization/managers`);
	return response.data;
}

export async function getManagedOrganizations() {
	const response = await $api.get(`/managed-organizations`);
	return response.data;
}

export async function addManager(email: string) {
	const response = await $api.post(`/manager-invitations`, {
		email
	});
	return response.data;
}

export async function getManagerInvitationDetails(invitationToken: string) {
	const response = await $api.get(`/manager-invitations/details`, {
		params: { invitation_token: invitationToken }
	});
	return response.data as {
		organization_name: string;
		organization_email: string;
	};
}

export async function acceptManagerInvitation(invitationToken: string) {
	const response = await $api.post(`/manager-invitations/accept`, {
		invitation_token: invitationToken
	});
	return response.data;
}

export async function removeManager(assigment_id: number) {
	const response = await $api.delete(`/manager-assignments/${assigment_id}`);
	return response.data;
}
