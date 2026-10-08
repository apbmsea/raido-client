import { combineReducers } from '@reduxjs/toolkit';
import { Cart } from '@entities/cart';
import { Catalog, Filters, Pagination } from '@entities/catalog';
import { Categories } from '@entities/category';
import { Favorite } from '@entities/favorite';
import { Manager } from '@entities/manager';
import { Modal } from '@entities/modal';
import { Offers } from '@entities/offers';
import { Order } from '@entities/order';
import { ProductDetails } from '@entities/product';
import { Question } from '@entities/question';
import { Review } from '@entities/review';
import { User } from '@entities/user';
import { Confirm, Login, Register } from '@features/auth';
import { Menu } from '@features/menu';
import { Search } from '@features/search';

const rootReducer = combineReducers({
	...Cart.reducer,
	...Catalog.reducer,
	...Filters.reducer,
	...Pagination.reducer,
	...Categories.reducer,
	...Favorite.reducer,
	...Manager.reducer,
	...Modal.reducer,
	...Offers.reducer,
	...Order.reducer,
	...ProductDetails.reducer,
	...Question.reducer,
	...Review.reducer,
	...User.reducer,
	...Confirm.reducer,
	...Login.reducer,
	...Register.reducer,
	...Menu.reducer,
	...Search.reducer
});

export default rootReducer;
