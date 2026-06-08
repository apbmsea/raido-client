import React, { useEffect, useRef, useState } from 'react';
import './Tabs.scss';

export interface TabItem<T extends string = string> {
	id: T;
	label: string;
	count?: number;
}

interface TabsProps<T extends string = string> {
	items: TabItem<T>[];
	activeTab: T;
	onChange: (id: T) => void;
	className?: string;
}

export const Tabs = <T extends string>({
	items,
	activeTab,
	onChange,
	className
}: TabsProps<T>) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [lineStyles, setLineStyles] = useState({ width: 0, left: 0 });

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const activeActiveButton = container.querySelector(
			`[data-tab-id="${activeTab}"]`
		) as HTMLButtonElement;

		if (activeActiveButton) {
			setLineStyles({
				width: activeActiveButton.offsetWidth,
				left: activeActiveButton.offsetLeft
			});
		}
	}, [activeTab, items]);

	return (
		<div
			ref={containerRef}
			className={`tabs-container ${className ?? ''}`}
			style={
				{
					'--line-width': `${lineStyles.width}px`,
					'--line-left': `${lineStyles.left}px`
				} as React.CSSProperties
			}
		>
			<div className='tabs-list' role='tablist'>
				{items.map(item => {
					const isActive = item.id === activeTab;

					return (
						<button
							key={item.id}
							type='button'
							role='tab'
							data-tab-id={item.id}
							aria-selected={isActive}
							className={`tabs-button ${
								isActive ? 'tabs-button--active' : ''
							}`}
							onClick={() => onChange(item.id)}
						>
							<span className='tabs-button__text'>
								{item.label} {item.count}
							</span>
						</button>
					);
				})}
			</div>
			<div className='tabs-indicator' aria-hidden='true' />
		</div>
	);
};

export default Tabs;
