import { actions, type Confirmation } from '../model/modalSlice';

const STORAGE_PREFIX = 'skip-confirmation:';

const isConfirmationSkipped = (skipKey: string) => {
	try {
		return localStorage.getItem(STORAGE_PREFIX + skipKey) === '1';
	} catch {
		return false;
	}
};

export const skipConfirmation = (skipKey: string) => {
	try {
		localStorage.setItem(STORAGE_PREFIX + skipKey, '1');
	} catch {}
};

export const confirmAction = (confirmation: Confirmation) =>
	confirmation.skipKey && isConfirmationSkipped(confirmation.skipKey)
		? confirmation.action
		: actions.openConfirmation(confirmation);
