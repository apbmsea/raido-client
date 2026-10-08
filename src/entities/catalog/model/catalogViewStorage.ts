import type { CatalogView } from './catalogTypes';

const STORAGE_KEY = 'catalog-view';

export const readCatalogView = (): CatalogView =>
	localStorage.getItem(STORAGE_KEY) === 'list' ? 'list' : 'grid';

export const saveCatalogView = (view: CatalogView) =>
	localStorage.setItem(STORAGE_KEY, view);
