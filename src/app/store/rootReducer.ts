import { Categories } from '@entities/category';
import { Catalog } from '@features/catalog';
import { Confirm } from '@features/confirm';
import { Login } from '@features/login';
import { Menu } from '@features/menu';
import { Modal } from '@features/modal';
import { Register } from '@features/register';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	...Menu.reducer,
	...Categories.reducer,
	...Catalog.reducer,
	...Modal.reducer,
	...Register.reducer,
	...Confirm.reducer,
	...Login.reducer
});

export default rootReducer;
