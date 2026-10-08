import { useEffect, useRef } from 'react';
import { hasNextPage, type PagingState } from '@shared/utils/pagination';
import { Button } from '../../Button';
import { Loader } from '../../Loader';
import './LoadMore.scss';

interface LoadMoreProps {
	paging: PagingState;
	onLoadMore: () => void;
}

/**
 * Ставится в конец списка: когда до него долистали, просит следующую страницу.
 * Рендерит пустоту, если страниц больше нет
 */
export const LoadMore = ({ paging, onLoadMore }: LoadMoreProps) => {
	const sentinelRef = useRef<HTMLDivElement>(null);
	const { isLoadingMore, isLoadMoreError } = paging;
	const hasMore = hasNextPage(paging);
	// После ошибки ждём нажатия кнопки: иначе запрос повторялся бы бесконечно
	const isWatching = hasMore && !isLoadingMore && !isLoadMoreError;

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!isWatching || !sentinel) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) onLoadMore();
			},
			// Начинаем грузить чуть раньше, чем список закончится на экране
			{ rootMargin: '300px' }
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [isWatching, onLoadMore]);

	if (!hasMore) return null;

	return (
		<div className='load-more' ref={sentinelRef}>
			{isLoadingMore && <Loader text='Загружаем ещё' />}
			{isLoadMoreError && (
				<Button size='s' variant='outline' onClick={onLoadMore}>
					Показать ещё
				</Button>
			)}
		</div>
	);
};
