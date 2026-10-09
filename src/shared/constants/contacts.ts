const STORE_COORDINATES = '56.850437,60.606251';

const PHONE = '+7 (900) 000-00-00';
const EMAIL = 'adres@gmail.com';

export const CONTACTS = {
	phone: PHONE,
	phoneHref: `tel:+${PHONE.replace(/\D/g, '')}`,
	email: EMAIL,
	emailHref: `mailto:${EMAIL}`,
	address: 'г. Екатеринбург, ул. Свердлова, д. 22',
	routeHref: `https://yandex.ru/maps/?rtext=~${STORE_COORDINATES}&rtt=auto`,
	workingHours: 'Ежедневно с 10:00 до 22:00'
};
