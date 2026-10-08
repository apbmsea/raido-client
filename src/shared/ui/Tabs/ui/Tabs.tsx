import clsx from 'clsx';
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
	return (
		<div className={clsx('tabs', className)} role='tablist'>
			{items.map(item => {
				const isActive = item.id === activeTab;

				return (
					<button
						key={item.id}
						type='button'
						role='tab'
						aria-selected={isActive}
						className={clsx(
							'tabs__button',
							isActive && 'tabs__button--active'
						)}
						onClick={() => onChange(item.id)}
					>
						{item.label}
						{item.count !== undefined && item.count > 0 && (
							<span className='tabs__count'>{item.count}</span>
						)}
					</button>
				);
			})}
		</div>
	);
};

export default Tabs;
