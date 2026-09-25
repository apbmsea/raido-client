import type { ComponentType } from 'react';

import OrdersIcon from '@shared/icons/Orders';
import SettingsIcon from '@shared/icons/Settings';
import BusinessProfileIcon from '@shared/icons/BusinessProfile';
import ManagersIcon from '@shared/icons/Managers';

type ProfileNavigationItem = {
	label: string;
	path: string;
	icon: ComponentType;
	isCorporate?: boolean;
};

export const PROFILE_NAVIGATION: ProfileNavigationItem[] = [
	{
		label: 'Мои заказы',
		path: '/profile/orders',
		icon: OrdersIcon
	},
	{
		label: 'Настройки профиля',
		path: '/profile/options',
		icon: SettingsIcon
	},
	{
		label: 'Менеджеры',
		path: '/profile/managers',
		icon: ManagersIcon,
		isCorporate: true
	},
	{
		label: 'Профиль для бизнеса',
		path: '/profile/business',
		icon: BusinessProfileIcon
	}
];
