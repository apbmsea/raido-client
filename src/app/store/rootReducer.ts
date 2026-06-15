import { Categories } from '@entities/category';
import { Question } from '@entities/question';
import { Review } from '@entities/review';
import { User } from '@entities/user';
import { CatalogMenu } from '@features/catalogMenu';
import { Confirm } from '@features/confirm';
import { Login } from '@features/login';
import { Menu } from '@features/menu';
import { Modal } from '@features/modal';
import { Register } from '@features/register';
import { Search } from '@features/search';
import { Catalog } from '@pages/CatalogPage';
import { Filters } from '@pages/CatalogPage/features/filters';
import { Pagination } from '@pages/CatalogPage/features/pagination';
import { Product } from '@pages/ProductPage';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	...Menu.reducer,
	...Categories.reducer,
	...CatalogMenu.reducer,
	...Modal.reducer,
	...Register.reducer,
	...Confirm.reducer,
	...Login.reducer,
	...Catalog.reducer,
	...Pagination.reducer,
	...Filters.reducer,
	...Search.reducer,
	...Product.reducer,
	...Review.reducer,
	...Question.reducer,
	...User.reducer
});

export default rootReducer;
