import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiErrors } from '@shared/types/handleError.type';
import type { ManagerType, OrganizationType } from './managerTypes';

interface ManagerState {
	managers: ManagerType[];
	organizations: OrganizationType[];
	isLoading: boolean;
	isFetch: boolean;
	errors: ApiErrors;
	managerToDelete: null | ManagerType;
}

const initialState: ManagerState = {
	organizations: [],
	managers: [],
	isLoading: false,
	isFetch: false,
	errors: {},
	managerToDelete: null
};

export const { reducer, actions, name } = createSlice({
	name: 'manager',
	initialState,
	reducers: {
		getManagersRequest: state => {
			state.isLoading = true;
		},
		getManagersSuccess: (state, action: PayloadAction<ManagerType[]>) => {
			state.isLoading = false;
			state.managers = action.payload;
		},
		getManagersFailure: state => {
			state.isLoading = false;
		},
		getManagedOrganizationsRequest: state => {
			state.isLoading = true;
		},
		getManagedOrganizationsSuccess: (
			state,
			action: PayloadAction<OrganizationType[]>
		) => {
			state.isLoading = false;
			state.organizations = action.payload;
		},
		getManagedOrganizationsFailure: state => {
			state.isLoading = false;
		},
		addManagerRequest: (
			state,
			_action: PayloadAction<{ email: string }>
		) => {
			state.isFetch = true;
			state.errors = {};
		},
		addManagerSuccess: state => {
			state.isFetch = false;
		},
		addManagerFailure: (state, action: PayloadAction<ApiErrors>) => {
			state.isFetch = false;
			state.errors = action.payload;
		},
		removeManagerRequest: (
			state,
			_action: PayloadAction<{ assignmentId: number }>
		) => {
			state.isFetch = true;
			state.errors = {};
		},
		removeManagerSuccess: state => {
			state.isFetch = false;
			state.managerToDelete = null;
		},
		removeManagerFailure: (state, action: PayloadAction<ApiErrors>) => {
			state.isFetch = false;
			state.errors = action.payload;
		},
		clearAllErrors: state => {
			state.errors = {};
		},
		setManagerToDelete: (state, action: PayloadAction<ManagerType>) => {
			state.managerToDelete = action.payload;
			state.errors = {};
		}
	}
});
