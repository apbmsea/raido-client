import { Categories } from '@entities/category';
import { CatalogMenu } from '@features/catalogMenu';
import { Confirm } from '@features/confirm';
import { Login } from '@features/login';
import { Menu } from '@features/menu';
import { Modal } from '@features/modal';
import { Register } from '@features/register';
import { Catalog } from '@pages/CatalogPage';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	...Menu.reducer,
	...Categories.reducer,
	...CatalogMenu.reducer,
	...Modal.reducer,
	...Register.reducer,
	...Confirm.reducer,
	...Login.reducer,
	...Catalog.reducer
});

export default rootReducer;
