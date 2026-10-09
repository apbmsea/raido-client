import {
	useEffect,
	useRef,
	useState,
	type ReactNode,
	type RefObject
} from 'react';
import clsx from 'clsx';
import './Reveal.scss';

interface RevealProps {
	as?: 'div' | 'section' | 'aside';
	className?: string;
	children: ReactNode;
}

const Reveal = ({ as = 'div', className, children }: RevealProps) => {
	const ref = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);
	const Tag = as as 'div';

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.12 }
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	return (
		<Tag
			ref={ref as RefObject<HTMLDivElement>}
			className={clsx(
				'reveal',
				isVisible && 'reveal--visible',
				className
			)}
		>
			{children}
		</Tag>
	);
};

export default Reveal;
