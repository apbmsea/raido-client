import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CreateOrderPayload, Order } from './orderTypes';

interface OrderState {
	total: number;
	items: Order[];
	isLoading: boolean;
	isFetching: boolean;
	isJustCreated: boolean;
	errors: Record<string, { message: string }>;
}

const initialState: OrderState = {
	total: 0,
	items: [],
	isLoading: false,
	isFetching: false,
	isJustCreated: false,
	errors: {}
};

export const { reducer, actions, name } = createSlice({
	name: 'order',
	initialState,
	reducers: {
		getOrdersRequest: state => {
			state.isLoading = true;
		},
		getOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
			state.isLoading = false;
			state.items = action.payload;
		},
		getOrdersFailure: state => {
			state.isLoading = false;
		},
		createOrderRequest: (state, _action: PayloadAction<CreateOrderPayload>) => {
			state.isFetching = true;
			state.errors = {};
		},
		createOrderSuccess: state => {
			state.isFetching = false;
			state.isJustCreated = true;
		},
		createOrderFailure: (
			state,
			action: PayloadAction<Record<string, { message: string }>>
		) => {
			state.isFetching = false;
			state.errors = action.payload;
		},
		clearJustCreated: state => {
			state.isJustCreated = false;
		},
		clearError: (state, action: PayloadAction<string>) => {
			delete state.errors[action.payload];
		},
		clearAllErrors: state => {
			state.errors = {};
		},
		setTotal: (state, action: PayloadAction<number>) => {
			state.total = action.payload;
		}
	}
});
