import type { MouseEventHandler, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AppLinkProps {
	to: string;
	isExternal?: boolean;
	className?: string;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
	children: ReactNode;
}

const AppLink = ({ to, isExternal, children, ...props }: AppLinkProps) =>
	isExternal ? (
		<a href={to} {...props}>
			{children}
		</a>
	) : (
		<Link to={to} {...props}>
			{children}
		</Link>
	);

export default AppLink;
