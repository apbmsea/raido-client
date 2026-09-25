import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Manager } from './managerTypes';

interface ManagerState {
	managers: Manager[];
	isLoading: boolean;
	isFetch: boolean;
	errors: Record<string, { message: string }>;
	deleteManager: null | Manager;
}

const initialState: ManagerState = {
	managers: [],
	isLoading: false,
	isFetch: false,
	errors: {},
	deleteManager: null
};

export const { reducer, actions, name } = createSlice({
	name: 'manager',
	initialState,
	reducers: {
		getManagersRequest: state => {
			state.isLoading = true;
		},
		getManagersSuccess: (state, action) => {
			state.isLoading = false;
			state.managers = action.payload;
		},
		getManagersFailure: state => {
			state.isLoading = false;
		},
		addManagerRequest: (
			state,
			_action: PayloadAction<{ email: string }>
		) => {
			state.isFetch = true;
		},
		addManagerSuccess: state => {
			state.isFetch = false;
		},
		addManagerFailure: (
			state,
			action: PayloadAction<Record<string, { message: string }>>
		) => {
			state.isFetch = false;
			state.errors = action.payload;
		},
		removeManagerRequest: (
			state,
			_action: PayloadAction<{ assignment_id: number }>
		) => {
			state.isFetch = true;
		},
		removeManagerSuccess: state => {
			state.isFetch = false;
		},
		removeManagerFailure: state => {
			state.isFetch = false;
		},
		clearAllErrors: state => {
			state.errors = {};
		},
		setDeleteManager: (state, action: PayloadAction<Manager>) => {
			state.deleteManager = action.payload;
		}
	}
});
