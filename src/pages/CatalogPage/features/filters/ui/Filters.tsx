import React, { useState, useEffect, useRef, useCallback } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Filters.scss';
import { Input } from '@shared/ui/Input';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Filters } from '..';
import { Checkbox } from '@shared/ui/Checkbox';
import ArrowRigthIcon from '@shared/icons/ArrowRight';
import { Button } from '@shared/ui/Button';

const STEPS = (() => {
	const steps = [];
	for (let i = 0; i <= 10000; i += 500) steps.push(i);
	for (let i = 11000; i <= 100000; i += 1000) steps.push(i);
	for (let i = 110000; i <= 1000000; i += 10000) steps.push(i);
	for (let i = 1050000; i <= 10000000; i += 500000) steps.push(i);
	return [...new Set(steps)];
})();

const SHOW_STEP = 10;
const MAX_IDX = STEPS.length - 1;

const FiltersComponent = () => {
	const dispatch = useAppDispatch();
	const { producers, selectedProducers } = useAppSelector(
		state => state.filters
	);
	const { minPrice, maxPrice } = useAppSelector(state => state.filters.price);

	const [visibleCount, setVisibleCount] = useState(SHOW_STEP);
	const displayedProducers = producers.slice(0, visibleCount);
	const [rangeIdx, setRangeIdx] = useState<[number, number]>([0, MAX_IDX]);
	const [inputValues, setInputValues] = useState<[string, string]>(['', '']);

	const hasMore = visibleCount < producers.length;

	const isInternalUpdate = useRef(false);

	const format = (val: number) => val.toLocaleString('ru-RU');
	const parse = (str: string) =>
		Number(str.replace(/\s/g, '').replace(/\D/g, ''));

	const findClosestIdx = useCallback((value: number) => {
		return STEPS.reduce(
			(prev, curr, idx) =>
				Math.abs(curr - value) < Math.abs(STEPS[prev] - value)
					? idx
					: prev,
			0
		);
	}, []);

	const handleShowMore = () => {
		setVisibleCount(prev => prev + SHOW_STEP);
	};

	useEffect(() => {
		if (isInternalUpdate.current) return;

		const startIdx = findClosestIdx(minPrice);
		const endIdx = findClosestIdx(maxPrice);
		setRangeIdx([startIdx, endIdx]);
		setInputValues([format(minPrice), format(maxPrice)]);
	}, [minPrice, maxPrice, findClosestIdx]);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!isInternalUpdate.current) return;

			const valFrom = parse(inputValues[0]);
			const valTo = parse(inputValues[1]);

			setRangeIdx([findClosestIdx(valFrom), findClosestIdx(valTo)]);

			if (valFrom !== minPrice || valTo !== maxPrice) {
				dispatch(
					Filters.actions.setPrice({
						minPrice: valFrom,
						maxPrice: valTo
					})
				);
			}

			isInternalUpdate.current = false;
		}, 800);

		return () => clearTimeout(timer);
	}, [inputValues, dispatch, minPrice, maxPrice, findClosestIdx]);

	const handleSliderChange = (newIndices: [number, number]) => {
		isInternalUpdate.current = true;
		setRangeIdx(newIndices);
		setInputValues([
			format(STEPS[newIndices[0]]),
			format(STEPS[newIndices[1]])
		]);
	};

	const handleInputChange = (
		type: 'from' | 'to',
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const input = e.target;
		const rawValue = input.value;
		const selectionStart = input.selectionStart;

		isInternalUpdate.current = true;

		const cleanValue = rawValue.replace(/\D/g, '');
		const formatted = cleanValue
			? Number(cleanValue).toLocaleString('ru-RU')
			: '';

		setInputValues(prev =>
			type === 'from' ? [formatted, prev[1]] : [prev[0], formatted]
		);

		requestAnimationFrame(() => {
			const lengthDiff = formatted.length - rawValue.length;
			const newPosition = (selectionStart ?? 0) + lengthDiff;
			input.setSelectionRange(newPosition, newPosition);
		});
	};

	const handleToggle = (name: string) => {
		dispatch(Filters.actions.toggleProducer(name));
	};

	return (
		<aside className='filters'>
			<h2 className='filters__title'>Фильтры</h2>
			<div className='filters__price'>
				<h4 className='filters__price-title'>Цена</h4>

				<div className='filters__price-block'>
					<span className='filters__label'>От</span>
					<div className='filters__input-wrapper'>
						<Input
							value={inputValues[0]}
							onChange={e => handleInputChange('from', e)}
						/>
						<span className='filters__currency'>₽</span>
					</div>
				</div>

				<div className='filters__price-block'>
					<span className='filters__label'>До</span>
					<div className='filters__input-wrapper'>
						<Input
							value={inputValues[1]}
							onChange={e => handleInputChange('to', e)}
						/>
						<span className='filters__currency'>₽</span>
					</div>
				</div>

				<div className='slider-wrapper'>
					<Slider
						range
						min={0}
						max={MAX_IDX}
						value={rangeIdx}
						onChange={val =>
							handleSliderChange(val as [number, number])
						}
						allowCross={true}
						pushable={1}
						trackStyle={[{ backgroundColor: '#bcc3ed' }]}
						handleStyle={[
							{
								borderColor: '#4a58f6',
								backgroundColor: '#4a58f6',
								opacity: 1,
								boxShadow: 'none'
							},
							{
								borderColor: '#4a58f6',
								backgroundColor: '#4a58f6',
								opacity: 1,
								boxShadow: 'none'
							}
						]}
					/>
				</div>
			</div>
			<div className='filters__producers'>
				<h4 className='filters__producers-title'>Производители</h4>
				<div className='filters__producers-list'>
					{displayedProducers.map(name => (
						<Checkbox
							key={name}
							label={name}
							checked={selectedProducers.includes(name.trim())}
							onChange={() => handleToggle(name)}
						/>
					))}
				</div>

				{hasMore && (
					<button
						type='button'
						className='filters__show-button'
						onClick={handleShowMore}
					>
						Смотреть все
						<ArrowRigthIcon color='#656565' size={14} />
					</button>
				)}
			</div>
			<Button onClick={() => dispatch(Filters.actions.resetFilters())}>Очистить</Button>
		</aside>
	);
};

export default FiltersComponent;
