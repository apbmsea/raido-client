import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import './SvgIcon.scss';

interface SvgIconProps {
	url: string;
	className?: string;
}

const svgCache = new Map<string, Promise<string>>();

const sanitizeSvg = (markup: string) => {
	const doc = new DOMParser().parseFromString(markup, 'image/svg+xml');
	const svg = doc.documentElement;

	if (svg.nodeName !== 'svg') return '';

	svg.querySelectorAll('script, foreignObject').forEach(el => el.remove());
	[svg, ...svg.querySelectorAll('*')].forEach(el => {
		[...el.attributes].forEach(attr => {
			if (
				attr.name.startsWith('on') ||
				attr.value.trim().toLowerCase().startsWith('javascript:')
			) {
				el.removeAttribute(attr.name);
			}
		});
	});

	return svg.outerHTML;
};

const loadSvg = (url: string) => {
	let request = svgCache.get(url);

	if (!request) {
		request = fetch(url)
			.then(res => (res.ok ? res.text() : ''))
			.then(sanitizeSvg)
			.catch(() => '');
		svgCache.set(url, request);
	}

	return request;
};

const SvgIcon: React.FC<SvgIconProps> = ({ url, className }) => {
	const [icon, setIcon] = useState<{ url: string; svg: string | null }>({
		url,
		svg: null
	});

	useEffect(() => {
		let isCurrent = true;

		loadSvg(url).then(svg => {
			if (isCurrent) setIcon({ url, svg });
		});

		return () => {
			isCurrent = false;
		};
	}, [url]);

	const svg = icon.url === url ? icon.svg : null;

	if (svg === '') {
		return (
			<span className={clsx('svg-icon', className)} aria-hidden='true'>
				<img className='svg-icon__fallback' src={url} alt='' />
			</span>
		);
	}

	return (
		<span
			className={clsx('svg-icon', className)}
			aria-hidden='true'
			dangerouslySetInnerHTML={{ __html: svg ?? '' }}
		/>
	);
};

export default SvgIcon;
