const STORAGE_KEY = 'is_2fa_enabled';

export const readTwoFactorEnabled = (): boolean | null => {
	const value = localStorage.getItem(STORAGE_KEY);
	return value === null ? null : value === 'true';
};

export const saveTwoFactorEnabled = (isEnabled: boolean | null) => {
	if (isEnabled === null) {
		localStorage.removeItem(STORAGE_KEY);
	} else {
		localStorage.setItem(STORAGE_KEY, String(isEnabled));
	}
};
