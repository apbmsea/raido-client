import { watchCategories } from '@entities/category';
import { WatchConfirm } from '@features/confirm';
import watchLogin from '@features/login/model/loginSaga';
import watchRegister from '@features/register/model/registerSaga';
import { all } from 'typed-redux-saga';

export default function* rootSaga() {
	yield all([watchCategories(), watchRegister(), WatchConfirm(), watchLogin()]);
}
