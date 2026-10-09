import type { RootState } from '@shared/types/store.types';

export const selectCategoryBySubcategoryId =
	(subcategoryId: number | null) => (state: RootState) =>
		subcategoryId === null
			? undefined
			: state.categories.categories.find(category =>
					category.subcategories.some(
						subcategory => subcategory.id === subcategoryId
					)
				);
