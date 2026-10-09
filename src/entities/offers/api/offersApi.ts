import { getProducts } from '@entities/product';

const OFFER_SUBCATEGORY_IDS = [18, 29, 123, 150, 88, 91];

export async function getOffers() {
	const id =
		OFFER_SUBCATEGORY_IDS[
			Math.floor(Math.random() * OFFER_SUBCATEGORY_IDS.length)
		];

	return getProducts(`subcategory_id=${id}`);
}
