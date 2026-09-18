import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CreateOrderPayload, Order } from './orderTypes';

interface OrderState {
	total: number;
	items: Order[];
	isLoading: boolean;
	isFetching: boolean;
}

const initialState: OrderState = {
	total: 0,
	items: [],
	isLoading: false,
	isFetching: false
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
		},
		createOrderSuccess: state => {
			state.isFetching = true;
		},
		createOrderFailure: state => {
			state.isFetching = true;
		},
		setTotal: (state, action: PayloadAction<number>) => {
			state.total = action.payload;
		}
	}
});
