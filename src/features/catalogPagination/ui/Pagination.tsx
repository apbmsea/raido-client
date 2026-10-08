import clsx from 'clsx';
import { Pagination as PaginationModel } from '@entities/catalog';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import ArrowLeftIcon from '@shared/icons/ArrowLeft';
import ArrowRightIcon from '@shared/icons/ArrowRight';
import './Pagination.scss';

const VISIBLE_PAGES = 7;

const getVisiblePages = (currentPage: number, totalPages: number) => {
	const half = Math.floor(VISIBLE_PAGES / 2);
	const start = Math.max(
		1,
		Math.min(currentPage - half, totalPages - VISIBLE_PAGES + 1)
	);
	const end = Math.min(totalPages, start + VISIBLE_PAGES - 1);

	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const Pagination = () => {
	const dispatch = useAppDispatch();
	const { totalPages, currentPage } = useAppSelector(
		state => state.pagination
	);

	if (totalPages <= 1) return null;

	const setPage = (page: number) => {
		if (page < 1 || page > totalPages || page === currentPage) return;
		dispatch(PaginationModel.actions.setCurrentPage(page));
	};

	return (
		<nav className='pagination' aria-label='Страницы каталога'>
			<button
				type='button'
				className='pagination__arrow'
				onClick={() => setPage(currentPage - 1)}
				disabled={currentPage === 1}
				aria-label='Предыдущая страница'
			>
				<ArrowLeftIcon />
			</button>

			<div className='pagination__pages'>
				{getVisiblePages(currentPage, totalPages).map(page => (
					<button
						type='button'
						key={page}
						className={clsx(
							'pagination__page',
							page === currentPage && 'pagination__page--active'
						)}
						onClick={() => setPage(page)}
						aria-current={page === currentPage ? 'page' : undefined}
					>
						{page}
					</button>
				))}
			</div>

			<button
				type='button'
				className='pagination__arrow'
				onClick={() => setPage(currentPage + 1)}
				disabled={currentPage === totalPages}
				aria-label='Следующая страница'
			>
				<ArrowRightIcon />
			</button>
		</nav>
	);
};

export default Pagination;
