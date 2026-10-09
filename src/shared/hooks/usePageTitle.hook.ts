import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'Райдо Сервис';
const PRIVATE_PATH = /^\/(cart|favorite|place-an-order|profile)(\/|$)/;

type MetaAttribute = 'name' | 'property';

interface PageMeta {
	description?: string;
	noindex?: boolean;
	canonical?: boolean;
}

const findMeta = (attribute: MetaAttribute, key: string) =>
	document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

const DEFAULT_DESCRIPTION = findMeta('name', 'description')?.content ?? '';

const setMeta = (
	attribute: MetaAttribute,
	key: string,
	content: string | null
) => {
	let tag = findMeta(attribute, key);

	if (content === null) {
		tag?.remove();
		return;
	}

	if (!tag) {
		tag = document.createElement('meta');
		tag.setAttribute(attribute, key);
		document.head.append(tag);
	}

	tag.content = content;
};

const setCanonical = (href: string | null) => {
	let link = document.head.querySelector<HTMLLinkElement>(
		'link[rel="canonical"]'
	);

	if (href === null) {
		link?.remove();
		return;
	}

	if (!link) {
		link = document.createElement('link');
		link.rel = 'canonical';
		document.head.append(link);
	}

	link.href = href;
};

export const usePageTitle = (
	title?: string | null,
	{ description, noindex = false, canonical = true }: PageMeta = {}
) => {
	const { pathname } = useLocation();

	useEffect(() => {
		if (title === null) return;

		const fullTitle = title ? `${SITE_NAME} - ${title}` : SITE_NAME;
		const pageDescription = description || DEFAULT_DESCRIPTION;
		const isHidden = noindex || PRIVATE_PATH.test(pathname);
		const pageUrl = window.location.origin + pathname;

		document.title = fullTitle;
		setMeta('name', 'description', pageDescription);
		setMeta('name', 'robots', isHidden ? 'noindex, nofollow' : null);
		setMeta('property', 'og:title', fullTitle);
		setMeta('property', 'og:description', pageDescription);
		setMeta(
			'property',
			'og:url',
			canonical ? pageUrl : window.location.href
		);
		setMeta('property', 'og:image', `${window.location.origin}/logo.png`);
		setCanonical(canonical && !isHidden ? pageUrl : null);
	}, [title, description, noindex, canonical, pathname]);
};
