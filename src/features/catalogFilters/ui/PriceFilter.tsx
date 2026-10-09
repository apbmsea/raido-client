import { useEffect, useState, type ChangeEvent } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Filters, PRICE_LIMITS } from '@entities/catalog';
import { useAppDispatch, useAppSelector } from '@shared/hooks/store.hooks';
import { Input } from '@shared/ui/Input';
import {
	findClosestStepIndex,
	formatPriceInput,
	parsePriceInput,
	PRICE_STEPS
} from '../lib/priceSteps';

const COMMIT_DELAY_MS = 800;

type Draft = { min: string; max: string };

const PriceFilter = () => {
	const dispatch = useAppDispatch();
	const { minPrice, maxPrice } = useAppSelector(state => state.filters.price);

	const [draft, setDraft] = useState<Draft | null>(null);

	const values = draft ?? {
		min: formatPriceInput(minPrice),
		max: formatPriceInput(maxPrice)
	};

	useEffect(() => {
		if (!draft) return;

		const timer = setTimeout(() => {
			const min = parsePriceInput(draft.min);
			const max = parsePriceInput(draft.max) || PRICE_LIMITS.maxPrice;
			const nextPrice = {
				minPrice: Math.min(min, max),
				maxPrice: Math.max(min, max)
			};

			if (
				nextPrice.minPrice !== minPrice ||
				nextPrice.maxPrice !== maxPrice
			) {
				dispatch(Filters.actions.setPrice(nextPrice));
			}
			setDraft(null);
		}, COMMIT_DELAY_MS);

		return () => clearTimeout(timer);
	}, [draft, minPrice, maxPrice, dispatch]);

	const handleInputChange = (
		field: keyof Draft,
		e: ChangeEvent<HTMLInputElement>
	) => {
		const input = e.target;
		const rawValue = input.value;
		const caret = input.selectionStart ?? rawValue.length;

		const digits = rawValue.replace(/\D/g, '');
		const formatted = digits ? formatPriceInput(Number(digits)) : '';

		setDraft({ ...values, [field]: formatted });

		requestAnimationFrame(() => {
			const position = Math.max(
				0,
				caret + formatted.length - rawValue.length
			);
			input.setSelectionRange(position, position);
		});
	};

	return (
		<div className='filters__section'>
			<h3 className='filters__section-title'>Цена</h3>

			<div className='filters__price-inputs'>
				<Input
					aria-label='Цена от'
					inputMode='numeric'
					startAdornment='от'
					endAdornment='₽'
					value={values.min}
					onChange={e => handleInputChange('min', e)}
				/>
				<Input
					aria-label='Цена до'
					inputMode='numeric'
					startAdornment='до'
					endAdornment='₽'
					value={values.max}
					onChange={e => handleInputChange('max', e)}
				/>
			</div>

			<div className='filters__slider'>
				<Slider
					range
					min={0}
					max={PRICE_STEPS.length - 1}
					value={[
						findClosestStepIndex(parsePriceInput(values.min)),
						findClosestStepIndex(
							parsePriceInput(values.max) || PRICE_LIMITS.maxPrice
						)
					]}
					onChange={indexes => {
						const [from, to] = indexes as number[];

						setDraft({
							min: formatPriceInput(PRICE_STEPS[from]),
							max: formatPriceInput(PRICE_STEPS[to])
						});
					}}
					allowCross={false}
					ariaLabelForHandle={['Минимальная цена', 'Максимальная цена']}
				/>
			</div>
		</div>
	);
};

export default PriceFilter;
