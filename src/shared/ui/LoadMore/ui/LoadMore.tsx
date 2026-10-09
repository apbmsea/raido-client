import { useEffect, useRef } from 'react';
import { hasNextPage, type PagingState } from '@shared/utils/pagination';
import { Button } from '../../Button';
import { Loader } from '../../Loader';
import './LoadMore.scss';

interface LoadMoreProps {
	paging: PagingState;
	onLoadMore: () => void;
}

export const LoadMore = ({ paging, onLoadMore }: LoadMoreProps) => {
	const sentinelRef = useRef<HTMLDivElement>(null);
	const { isLoadingMore, isLoadMoreError } = paging;
	const hasMore = hasNextPage(paging);
	const isWatching = hasMore && !isLoadingMore && !isLoadMoreError;

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!isWatching || !sentinel) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) onLoadMore();
			},
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
