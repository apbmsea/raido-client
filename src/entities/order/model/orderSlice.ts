import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiErrors } from '@shared/types/handleError.type';
import type {
	CreateOrderPayload,
	OrdersResponse,
	OrderType
} from './orderTypes';

interface OrderState {
	total: number;
	items: OrderType[];
	isLoading: boolean;
	isFetching: boolean;
	isJustCreated: boolean;
	errors: ApiErrors;
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
		getOrdersSuccess: (state, action: PayloadAction<OrdersResponse>) => {
			state.isLoading = false;
			state.items = action.payload.items;
			state.total = action.payload.total;
		},
		getOrdersFailure: state => {
			state.isLoading = false;
		},
		createOrderRequest: (
			state,
			_action: PayloadAction<CreateOrderPayload>
		) => {
			state.isFetching = true;
			state.errors = {};
		},
		createOrderSuccess: state => {
			state.isFetching = false;
			state.isJustCreated = true;
		},
		createOrderFailure: (state, action: PayloadAction<ApiErrors>) => {
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
		// Флаг «только что оформлен» переживает сброс: он нужен странице заказа
		reset: state => ({
			...initialState,
			isJustCreated: state.isJustCreated
		})
	}
});
