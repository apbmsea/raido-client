const NO_INFO = /^(нет (информации|данных)|не указан|неизвестн|[-—–]+$|n\/a$)/i;

export const hasInfo = (value?: string | null): value is string => {
	const text = value?.trim();

	return !!text && !NO_INFO.test(text);
};
