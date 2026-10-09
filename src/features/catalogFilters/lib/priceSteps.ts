import { PRICE_LIMITS } from '@entities/catalog';

const buildSteps = () => {
	const steps: number[] = [];

	for (let i = 0; i <= 10_000; i += 500) steps.push(i);
	for (let i = 11_000; i <= 100_000; i += 1_000) steps.push(i);
	for (let i = 110_000; i <= 1_000_000; i += 10_000) steps.push(i);
	for (let i = 1_500_000; i <= PRICE_LIMITS.maxPrice; i += 500_000) {
		steps.push(i);
	}

	return steps;
};

export const PRICE_STEPS = buildSteps();

export const findClosestStepIndex = (value: number) =>
	PRICE_STEPS.reduce(
		(closest, step, index) =>
			Math.abs(step - value) < Math.abs(PRICE_STEPS[closest] - value)
				? index
				: closest,
		0
	);

export const formatPriceInput = (value: number) =>
	value.toLocaleString('ru-RU');

export const parsePriceInput = (value: string) =>
	Number(value.replace(/\D/g, ''));
