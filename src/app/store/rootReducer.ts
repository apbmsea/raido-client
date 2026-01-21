import { Menu } from '@features/menu';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	...Menu.reducer
});

export default rootReducer;
