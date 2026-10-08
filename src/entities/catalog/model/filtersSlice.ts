import { createSlice, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import { actions as catalogActions } from './catalogSlice';
import { PRICE_LIMITS } from './catalogTypes';

interface FiltersState {
	price: {
		minPrice: number;
		maxPrice: number;
	};
	producers: string[];
	selectedProducers: string[];
}

const initialState: FiltersState = {
	price: PRICE_LIMITS,
	producers: [],
	selectedProducers: []
};

const resetSelection = (state: FiltersState) => {
	state.price = initialState.price;
	state.selectedProducers = [];
};

export const { reducer, actions, name } = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setPrice: (
			state,
			action: PayloadAction<{ minPrice: number; maxPrice: number }>
		) => {
			state.price = action.payload;
		},
		setProducers: (state, action: PayloadAction<string[]>) => {
			state.producers = action.payload;
		},
		setSelectedProducers: (state, action: PayloadAction<string[]>) => {
			state.selectedProducers = action.payload;
		},
		toggleProducer: (state, action: PayloadAction<string>) => {
			const index = state.selectedProducers.indexOf(action.payload);
			if (index === -1) {
				state.selectedProducers.push(action.payload);
			} else {
				state.selectedProducers.splice(index, 1);
			}
		},
		resetFilters: resetSelection
	},
	extraReducers: builder => {
		// Фильтры относятся к конкретной выборке и не переносятся в другой раздел
		builder.addMatcher(
			isAnyOf(
				catalogActions.navigateToCategory,
				catalogActions.navigateToSubcategory,
				catalogActions.navigateToSearch
			),
			resetSelection
		);
	}
});
