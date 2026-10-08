import { useState } from 'react';
import clsx from 'clsx';
import { Filters } from '@entities/catalog';
import { LAPTOP_QUERY } from '@shared/constants/breakpoints';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { useLockScroll } from '@shared/hooks/useLockScroll.hook';
import { useMediaQuery } from '@shared/hooks/useMediaQuery.hook';
import CloseIcon from '@shared/icons/Close';
import { Button } from '@shared/ui/Button';
import { Checkbox } from '@shared/ui/Checkbox';
import { IconButton } from '@shared/ui/IconButton';
import PriceFilter from './PriceFilter';
import './Filters.scss';

const SHOW_STEP = 10;

type FiltersPanelProps = {
	/** На узких экранах панель — выезжающая шторка, её открывает кнопка в тулбаре */
	isOpen: boolean;
	onClose: () => void;
};

const FiltersPanel = ({ isOpen, onClose }: FiltersPanelProps) => {
	const dispatch = useAppDispatch();
	const { producers, selectedProducers } = useAppSelector(
		state => state.filters
	);
	const [visibleProducerCount, setVisibleProducerCount] = useState(SHOW_STEP);
	// Счётчик пересоздаёт фильтр цены, сбрасывая в нём несохранённый ввод
	const [resetCount, setResetCount] = useState(0);

	const isDrawer = useMediaQuery(LAPTOP_QUERY);
	useLockScroll(isDrawer && isOpen);

	const handleReset = () => {
		dispatch(Filters.actions.resetFilters());
		setResetCount(count => count + 1);
	};

	return (
		// На десктопе слой прозрачен для раскладки, на узких экранах — это
		// подложка на весь экран, из-за края которой выезжает панель
		<div className={clsx('filters-layer', isOpen && 'filters-layer--open')}>
			<div className='filters-layer__backdrop' onClick={onClose} />

			<aside className='filters' aria-label='Фильтры'>
				<div className='filters__header'>
					<h2 className='filters__title'>Фильтры</h2>
					<IconButton
						className='filters__close'
						variant='ghost'
						size='s'
						icon={<CloseIcon size={20} />}
						onClick={onClose}
						aria-label='Закрыть фильтры'
					/>
				</div>

				<div className='filters__body'>
					<PriceFilter key={resetCount} />

					{producers.length > 0 && (
						<div className='filters__section'>
							<h3 className='filters__section-title'>Производители</h3>

							<div className='filters__options'>
								{producers
									.slice(0, visibleProducerCount)
									.map(producer => (
										<Checkbox
											key={producer}
											label={producer}
											checked={selectedProducers.includes(
												producer
											)}
											onChange={() =>
												dispatch(
													Filters.actions.toggleProducer(
														producer
													)
												)
											}
										/>
									))}
							</div>

							{visibleProducerCount < producers.length && (
								<button
									type='button'
									className='filters__show-more'
									onClick={() =>
										setVisibleProducerCount(
											count => count + SHOW_STEP
										)
									}
								>
									Показать ещё
								</button>
							)}
						</div>
					)}
				</div>

				<div className='filters__footer'>
					<Button variant='outline' onClick={handleReset}>
						Очистить
					</Button>
					<Button className='filters__apply' onClick={onClose}>
						Показать
					</Button>
				</div>
			</aside>
		</div>
	);
};

export default FiltersPanel;
