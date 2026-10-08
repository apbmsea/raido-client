import { actions, type Confirmation } from '../model/modalSlice';

const STORAGE_PREFIX = 'skip-confirmation:';

// Хранилище бывает недоступно (приватный режим, запрет в настройках):
// тогда просто спрашиваем каждый раз
const isConfirmationSkipped = (skipKey: string) => {
	try {
		return localStorage.getItem(STORAGE_PREFIX + skipKey) === '1';
	} catch {
		return false;
	}
};

/** Запоминает выбор «Больше не спрашивать» для этого вида подтверждения */
export const skipConfirmation = (skipKey: string) => {
	try {
		localStorage.setItem(STORAGE_PREFIX + skipKey, '1');
	} catch {
		// намеренно пусто
	}
};

/**
 * Действие, которое нужно отправить в стор: окно подтверждения или,
 * если пользователь просил больше не спрашивать, сразу само действие
 */
export const confirmAction = (confirmation: Confirmation) =>
	confirmation.skipKey && isConfirmationSkipped(confirmation.skipKey)
		? confirmation.action
		: actions.openConfirmation(confirmation);
