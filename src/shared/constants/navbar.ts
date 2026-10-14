import { CONTACTS } from './contacts';

export interface NavLinkItem {
	title: string;
	link: string;
	isExternal?: boolean;
}

export interface NavItem {
	id: string;
	title: string;
	content: NavLinkItem[];
}

export const NAV_ITEMS: NavItem[] = [
	{
		id: 'corporate',
		title: 'Корпоративным клиентам',
		content: [
			{ title: 'Условия для бизнеса', link: '/business-conditions' },
			{ title: 'Тендеры', link: '/tenders' }
		]
	},
	{
		id: 'buyers',
		title: 'Покупателям',
		content: [
			{ title: 'Доставка и оплата', link: '/delivery-and-payment' },
			{ title: 'Гарантия', link: '/warranty' },
			// { title: 'Бонусы', link: '/bonuses' },
			{ title: 'Ответы на вопросы', link: '/faq' }
		]
	},
	{
		id: 'about',
		title: 'О компании',
		content: [{ title: 'О нас', link: '/about-company' }]
	},
	{
		id: 'contacts',
		title: 'Контакты',
		content: [
			{ title: CONTACTS.phone, link: CONTACTS.phoneHref, isExternal: true },
			{ title: CONTACTS.email, link: CONTACTS.emailHref, isExternal: true }
		]
	}
];
