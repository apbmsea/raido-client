export interface AddressFields {
	address: string;
	apartment: string;
	entrance: string;
	floor: string;
	intercom: string;
}

/**
 * Сервер принимает адрес одной строкой, поэтому квартира, подъезд, этаж
 * и домофон дописываются к нему через запятую
 */
export const buildShippingAddress = ({
	address,
	apartment,
	entrance,
	floor,
	intercom
}: AddressFields) =>
	[
		address.trim(),
		apartment.trim() && `кв. ${apartment.trim()}`,
		entrance.trim() && `подъезд ${entrance.trim()}`,
		floor.trim() && `этаж ${floor.trim()}`,
		intercom.trim() && `домофон ${intercom.trim()}`
	]
		.filter(Boolean)
		.join(', ');
