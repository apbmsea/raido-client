import { Categories } from '@entities/category';
import { Catalog } from '@features/catalog';
import { Menu } from '@features/menu';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	...Menu.reducer,
	...Categories.reducer,
	...Catalog.reducer
});

export default rootReducer;
