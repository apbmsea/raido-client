import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { actions } from '../model/paginationSlice';
import './Pagination.scss';
import ArrowLeftIcon from '@shared/icons/ArrowLeft';
import ArrowRigthIcon from '@shared/icons/ArrowRight';

const VISIBLE = 7;

const Pagination = () => {
	const dispatch = useAppDispatch();
	const { totalPages, currentPage } = useAppSelector(state => state.pagination);

	const setPage = (page: number) => {
		if (page < 1 || page > totalPages) return;
		dispatch(actions.setCurrentPage(page));
	};

	const getPages = (): number[] => {
		const half = Math.floor(VISIBLE / 2);
		let start = currentPage - half;
		let end = currentPage + half;

		if (start < 1) { start = 1; end = Math.min(VISIBLE, totalPages); }
		if (end > totalPages) { end = totalPages; start = Math.max(1, totalPages - VISIBLE + 1); }

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	if (totalPages <= 1) return null;

	const pages = getPages();

	return (
		<div className='pagination'>
			<button
				className='pagination__arrow'
				onClick={() => setPage(currentPage - 1)}
				disabled={currentPage === 1}
			>
				<ArrowLeftIcon />
			</button>

			<div className='pagination__dots'>
				{pages.map(page => (
					<button
						key={page}
						className={`pagination__dot${page === currentPage ? ' pagination__dot--active' : ''}`}
						onClick={() => setPage(page)}
					>
						{page}
					</button>
				))}
			</div>

			<button
				className='pagination__arrow'
				onClick={() => setPage(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				<ArrowRigthIcon />
			</button>
		</div>
	);
};

export default Pagination;
