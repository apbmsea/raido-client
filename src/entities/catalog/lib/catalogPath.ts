export const CATALOG_PATH = '/catalog';

export const isCatalogPath = (pathname: string) =>
	/^\/catalog\/?$/.test(pathname);
