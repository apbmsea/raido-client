import type { ComponentType } from 'react';

import OrdersIcon from '@shared/icons/Orders';
import BonusIcon from '@shared/icons/Bonus';
import SettingsIcon from '@shared/icons/Settings';
import BusinessProfileIcon from '@shared/icons/BusinessProfile';

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
		label: 'Мои бонусы',
		path: '/profile/bonus',
		icon: BonusIcon,
	},
	{
		label: 'Настройки профиля',
		path: '/profile/options',
		icon: SettingsIcon,
	},
	{
		label: 'Профиль для бизнеса',
		path: '/profile/business',
		icon: BusinessProfileIcon,
	}
];
