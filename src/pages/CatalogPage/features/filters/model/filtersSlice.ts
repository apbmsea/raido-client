import { createSlice, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import { actions as catalogActions } from '../../../model/catalogSlice';

interface FiltersState {
	price: {
		minPrice: number;
		maxPrice: number;
	};
	producers: string[];
	selectedProducers: string[];
	subcategories: string[];
	selectedSubcategories: string[];
}

const initialState: FiltersState = {
	price: {
		minPrice: 0,
		maxPrice: 10000000
	},
	producers: [],
	selectedProducers: [],
	subcategories: [],
	selectedSubcategories: []
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
		setSubcategories: (state, action: PayloadAction<string[]>) => {
			state.subcategories = action.payload;
		},
		setSelectedSubcategories: (state, action: PayloadAction<string[]>) => {
			state.selectedSubcategories = action.payload;
		},
		toggleSubcategories: (state, action: PayloadAction<string>) => {
			const index = state.selectedSubcategories.indexOf(action.payload);
			if (index === -1) {
				state.selectedSubcategories.push(action.payload);
			} else {
				state.selectedSubcategories.splice(index, 1);
			}
		},
		resetFilters: state => {
			state.price = initialState.price;
			state.selectedProducers = [];
			state.selectedSubcategories = [];
		}
	},
	extraReducers: builder => {
		builder.addMatcher(
			isAnyOf(
				catalogActions.navigateToСategory,
				catalogActions.navigateToSubcategory,
				catalogActions.navigateToSearch
			),
			state => {
				state.price = initialState.price;
				state.selectedProducers = [];
				state.selectedSubcategories = [];
			}
		);
	}
});
