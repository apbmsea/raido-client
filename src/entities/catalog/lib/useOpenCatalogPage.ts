import { useLocation, useNavigate } from 'react-router-dom';
import { CATALOG_PATH, isCatalogPath } from './catalogPath';

export const useOpenCatalogPage = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return () => {
		if (!isCatalogPath(pathname)) navigate(CATALOG_PATH);
	};
};
