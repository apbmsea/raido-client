import { useState, type ImgHTMLAttributes, type SyntheticEvent } from 'react';
import clsx from 'clsx';
import './AppImage.scss';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	loaderTone?: 'primary' | 'light';
}

const AppImage = ({
	src,
	className,
	loaderTone = 'primary',
	onLoad,
	onError,
	...props
}: AppImageProps) => {
	const [settledSrc, setSettledSrc] = useState<string>();

	const handleLoad = (e: SyntheticEvent<HTMLImageElement>) => {
		setSettledSrc(src);
		onLoad?.(e);
	};

	const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
		setSettledSrc(src);
		onError?.(e);
	};

	return (
		<img
			{...props}
			src={src}
			className={clsx(
				'app-image',
				src !== settledSrc && 'app-image--loading',
				src !== settledSrc &&
					loaderTone === 'light' &&
					'app-image--loading-light',
				className
			)}
			onLoad={handleLoad}
			onError={handleError}
		/>
	);
};

export default AppImage;
