import { useEffect, useRef } from 'react';
import {
	CatalogCategories,
	CatalogSubcategories,
	Menu,
	selectIsCatalogOpen
} from '@features/menu';
import { TABLET_QUERY } from '@shared/constants/breakpoints';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useMediaQuery } from '@shared/hooks/useMediaQuery.hook';
import CloseIcon from '@shared/icons/Close';
import { IconButton } from '@shared/ui/IconButton';
import './CatalogMenu.scss';

/**
 * Каталог для десктопа: панель с категориями поверх содержимого страницы.
 * На планшетах и телефонах те же экраны показывает BurgerMenu
 */
const CatalogMenu = () => {
	const dispatch = useAppDispatch();
	const isCatalogOpen = useAppSelector(selectIsCatalogOpen);
	const isTablet = useMediaQuery(TABLET_QUERY);
	const isVisible = isCatalogOpen && !isTablet;
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isVisible) return;

		// Каталог могли открыть из середины страницы — показываем его начало
		rootRef.current?.scrollIntoView({ block: 'nearest' });

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') dispatch(Menu.actions.close());
		};

		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, [isVisible, dispatch]);

	if (!isVisible) return null;

	return (
		<div className='catalog-menu'>
			<div
				className='catalog-menu__backdrop'
				onClick={() => dispatch(Menu.actions.close())}
			/>

			<div
				className='catalog-menu__panel'
				ref={rootRef}
				role='dialog'
				aria-label='Каталог'
			>
				<div className='catalog-menu__categories'>
					<CatalogCategories highlightActive />
				</div>
				<div className='catalog-menu__subcategories'>
					<CatalogSubcategories />
				</div>
				<IconButton
					onClick={() => dispatch(Menu.actions.close())}
					aria-label='Закрыть каталог'
					className='catalog-menu__close'
					variant='ghost'
					size='s'
					icon={<CloseIcon />}
				/>
			</div>
		</div>
	);
};

export default CatalogMenu;
