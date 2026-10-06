import { call, put, take, takeLatest } from 'typed-redux-saga';
import { Confirm } from '..';
import { confirm, type ConfirmPayload } from '@entities/confirm';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Modal } from '@entities/modal';
import { isApiError } from '@shared/utils/errorHandler';
import { User } from '@entities/user';

function* confirmSaga(action: PayloadAction<ConfirmPayload>) {
	try {
		const response = yield* call(confirm, action.payload);
		yield* put(Confirm.actions.confirmSuccess());

		if (action.payload.url === '2fa/switch') {
			yield* put(User.actions.toggleTwoFactorEnabled());
			yield* put(Modal.actions.openModal('confirmSuccess'));
			return;
		}

		if (action.payload.url === 'password/change') {
			// Сервер завершил все сессии, старый токен больше не действует.
			// Пользователя сбрасываем после закрытия сообщения, иначе его перекроет окно входа
			localStorage.removeItem('token');
			yield* put(Modal.actions.openModal('confirmSuccess'));
			yield* take([
				Modal.actions.closeModal.type,
				Modal.actions.openModal.type
			]);
			yield* put(User.actions.clearUser());
			return;
		}

		localStorage.setItem('token', response.token);
		// Вход с кодом означает включённую 2FA, после регистрации статус неизвестен
		yield* put(
			User.actions.setTwoFactorEnabled(
				action.payload.url === 'login' ? true : null
			)
		);
		yield* put(Modal.actions.closeModal());
		yield* put(User.actions.getUserRequest());
	} catch (error) {
		if (isApiError(error) && Object.keys(error.errors).length > 0) {
			yield* put(Confirm.actions.confirmFailure(error.errors));
		} else {
			yield* put(
				Confirm.actions.confirmFailure({
					_form: {
						message:
							'Не удалось подтвердить код. Попробуйте ещё раз.'
					}
				})
			);
		}
	}
}

export default function* watchConfirm() {
	yield* takeLatest(Confirm.actions.confirmRequest.type, confirmSaga);
}
