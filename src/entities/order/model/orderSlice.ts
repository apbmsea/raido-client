import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ApiErrors } from '@shared/types/handleError.type';
import {
	applyNextPage,
	failNextPage,
	initialPaging,
	startNextPage,
	toPaging,
	type PagingState
} from '@shared/utils/pagination';
import type {
	CreateOrderPayload,
	OrdersResponse,
	OrderType
} from './orderTypes';

interface OrderState {
	total: number;
	items: OrderType[];
	isLoading: boolean;
	paging: PagingState;
	isFetching: boolean;
	/** Номер только что оформленного заказа — для окна «Спасибо за заказ» */
	createdOrderId: number | null;
	errors: ApiErrors;
}

const initialState: OrderState = {
	total: 0,
	items: [],
	isLoading: false,
	paging: initialPaging,
	isFetching: false,
	createdOrderId: null,
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
			state.paging = toPaging(action.payload);
		},
		getOrdersFailure: state => {
			state.isLoading = false;
		},
		getOrdersMoreRequest: state => startNextPage(state.paging),
		getOrdersMoreSuccess: (state, action: PayloadAction<OrdersResponse>) => {
			applyNextPage(state.paging, state.items, action.payload);
			state.total = action.payload.total;
		},
		getOrdersMoreFailure: state => failNextPage(state.paging),
		createOrderRequest: (
			state,
			_action: PayloadAction<CreateOrderPayload>
		) => {
			state.isFetching = true;
			state.errors = {};
		},
		createOrderSuccess: (state, action: PayloadAction<number | null>) => {
			state.isFetching = false;
			state.createdOrderId = action.payload;
		},
		createOrderFailure: (state, action: PayloadAction<ApiErrors>) => {
			state.isFetching = false;
			state.errors = action.payload;
		},
		clearError: (state, action: PayloadAction<string>) => {
			delete state.errors[action.payload];
		},
		clearAllErrors: state => {
			state.errors = {};
		},
		// Номер нового заказа переживает сброс: он нужен окну «Спасибо за заказ»
		reset: state => ({
			...initialState,
			createdOrderId: state.createdOrderId
		})
	}
});
