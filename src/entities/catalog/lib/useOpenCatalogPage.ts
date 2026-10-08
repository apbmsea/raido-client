import { useLocation, useNavigate } from 'react-router-dom';
import { CATALOG_PATH, isCatalogPath } from './catalogPath';

/**
 * Возвращает функцию перехода на страницу каталога. Вызывается вместе
 * с действием, которое меняет выборку (раздел, поиск).
 *
 * Если каталог уже открыт, перехода нет: параметры выборки в адресе обновляет
 * сага каталога, а повторный переход стёр бы их
 */
export const useOpenCatalogPage = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return () => {
		if (!isCatalogPath(pathname)) navigate(CATALOG_PATH);
	};
};
