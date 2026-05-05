import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
	price: {
		minPrice: number;
		maxPrice: number;
	};
	producers: string[];
	selectedProducers: string[];
}

const initialState: FiltersState = {
	price: {
		minPrice: 0,
		maxPrice: 10000000
	},
	producers: [],
	selectedProducers: []
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
		resetFilters: state => {
			state.price = { maxPrice: 10000000, minPrice: 0 };
			state.selectedProducers = [];
		}
	}
});
