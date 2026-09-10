import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AddItemToCartPayload } from './cartType';
import type { Product } from '@entities/catalog/model/catalog.type';

interface CartItem {
	final_subtotal: string;
	id: number;
	product: Product;
	product_id: number;
	quantity: number;
	retail_subtotal: string;
}

interface CartState {
	items: CartItem[];
	isLoading: boolean;
	isFetch: boolean;
}

const initialState: CartState = {
	items: [],
	isLoading: false,
	isFetch: false
};

export const { reducer, actions, name } = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		getCartRequest: state => {
			state.isLoading = true;
		},
		getCartSuccess: (state, action) => {
			state.isLoading = false;
			state.items = action.payload;
		},
		getCartFailure: state => {
			state.isLoading = false;
		},
		addItemToCartRequest: (
			state,
			_action: PayloadAction<AddItemToCartPayload>
		) => {
			state.isFetch = true;
		},
		addItemToCartSuccess: state => {
			state.isFetch = false;
		},
		addItemToCartFailure: state => {
			state.isFetch = false;
		},
		increaseQuantityRequest: (
			state,
			_action: PayloadAction<{
				product_id: number;
				quantity: number;
			}>
		) => {
			state.isFetch = true;
		},

		increaseQuantitySuccess: (
			state,
			action: PayloadAction<{
				product_id: number;
				quantity: number;
			}>
		) => {

			console.log(action.payload.product_id);
			
			const item = state.items.find(
				item => item.id === action.payload.product_id
			);

			if (item) {
				item.quantity = action.payload.quantity;
			}

			state.isFetch = false;
		},

		increaseQuantityFailure: state => {
			state.isFetch = false;
		},

		decreaseQuantityRequest: (
			state,
			_action: PayloadAction<{
				product_id: number;
				quantity: number;
			}>
		) => {
			state.isFetch = true;
		},

		decreaseQuantitySuccess: (
			state,
			action: PayloadAction<{
				product_id: number;
				quantity: number;
			}>
		) => {
			const item = state.items.find(
				item => item.id === action.payload.product_id
			);

			if (item) {
				item.quantity = action.payload.quantity;
			}

			state.isFetch = false;
		},

		decreaseQuantityFailure: state => {
			state.isFetch = false;
		},

		removeItemFromCartRequest: (
			state,
			_action: PayloadAction<{ product_id: number }>
		) => {
			state.isFetch = true;
		},

		removeItemFromCartSuccess: (
			state,
			action: PayloadAction<{ product_id: number }>
		) => {
			state.items = state.items.filter(
				item => item.product_id !== action.payload.product_id
			);

			state.isFetch = false;
		},

		removeItemFromCartFailure: state => {
			state.isFetch = false;
		}
	}
});
