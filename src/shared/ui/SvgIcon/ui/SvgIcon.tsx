import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import './SvgIcon.scss';

interface SvgIconProps {
	url: string;
	/** Размер и цвет задаются классом: иконка растягивается на весь контейнер */
	className?: string;
}

// Одна и та же иконка показывается во многих местах сразу,
// поэтому разметка загружается один раз на адрес
const svgCache = new Map<string, Promise<string>>();

// Иконки приходят с сервера и вставляются как HTML — вырезаем всё исполняемое
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
			// Чаще всего это запрет CORS: тогда иконку покажет обычный <img>
			.catch(() => '');
		svgCache.set(url, request);
	}

	return request;
};

const SvgIcon: React.FC<SvgIconProps> = ({ url, className }) => {
	// svg: null — ещё грузится, '' — встроить разметку не удалось
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

	// Встроенная разметка наследует цвет текста. Запасной <img> перекрасить
	// нельзя, зато он грузится без CORS
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
