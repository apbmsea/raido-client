import React, { useEffect, useState } from 'react';
import './SvgIcon.scss'

interface SvgIconProps {
	url: string;
	color?: string;
	width?: number;
	height?: number;
	className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
	url,
	color = 'currentColor',
	width = 24,
	height = 24,
	className
}) => {
	const [svg, setSvg] = useState<string>('');

	useEffect(() => {
		fetch(url)
			.then(res => res.text())
			.then(setSvg)
			.catch(console.error);
	}, [url]);

	return (
		<span
			className={className}
			style={{ display: 'inline-block', width, height, color }}
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
};

export default SvgIcon;