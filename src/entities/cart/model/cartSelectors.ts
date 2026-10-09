import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@shared/types/store.types';

const selectItems = (state: RootState) => state.cart.items;
const selectExcludedIds = (state: RootState) => state.cart.excludedProductIds;

export const selectCartItemByProductId =
	(productId: number) => (state: RootState) =>
		state.cart.items.find(item => item.product_id === productId);

export const selectIsCartProductPending =
	(productId: number) => (state: RootState) =>
		state.cart.pendingProductIds.includes(productId);

export const selectSelectedCartItems = createSelector(
	[selectItems, selectExcludedIds],
	(items, excludedIds) =>
		items.filter(item => !excludedIds.includes(item.product_id))
);

export const selectSelectedCartTotal = createSelector(
	[selectSelectedCartItems],
	items => items.reduce((sum, item) => sum + Number(item.final_subtotal), 0)
);
