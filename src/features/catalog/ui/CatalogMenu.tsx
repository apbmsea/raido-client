import './CatalogMenu.scss';
import { useAppSelector } from '@shared/hooks/store.hooks';
import { CatalogCategories } from '@features/categories';
import { CatalogSubcategories } from '@features/subcategories';


const CatalogMenu = () => {
	const { isOpen } = useAppSelector(state => state.catalog);

	if (!isOpen) return null;

	return (
		<div className='catalog-menu hidden-tablet'>
			<CatalogCategories />
			<CatalogSubcategories />
		</div>
	);
};

export default CatalogMenu;
