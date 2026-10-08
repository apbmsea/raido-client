import { useEffect } from 'react';

const SITE_NAME = 'Райдо Сервис';

/**
 * Заголовок вкладки браузера: «Райдо Сервис - Раздел».
 * Без названия раздела остаётся только имя сайта, null — заголовок не трогаем
 */
export const usePageTitle = (title?: string | null) => {
	useEffect(() => {
		if (title === null) return;

		document.title = title ? `${SITE_NAME} - ${title}` : SITE_NAME;
	}, [title]);
};
