import type { RootState } from '@shared/types/store.types';

export const selectFavoriteItemByProductId =
	(productId: number) => (state: RootState) =>
		state.favorite.items.find(item => item.product_id === productId);

export const selectIsFavoriteProductPending =
	(productId: number) => (state: RootState) =>
		state.favorite.pendingProductIds.includes(productId);
