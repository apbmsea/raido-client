import { createBrowserRouter } from 'react-router-dom';
import Layout from '@app/layout/Layout';
import { HomePage } from '@pages/HomePage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { Loader } from '@shared/ui/Loader';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		hydrateFallbackElement: <Loader />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: 'catalog',
				lazy: async () => ({
					Component: (await import('@pages/CatalogPage')).CatalogPage
				})
			},
			{
				path: 'product/:id',
				lazy: async () => ({
					Component: (await import('@pages/ProductPage')).ProductPage
				})
			},
			{
				path: 'cart',
				lazy: async () => ({
					Component: (await import('@pages/CartPage')).CartPage
				})
			},
			{
				path: 'favorite',
				lazy: async () => ({
					Component: (await import('@pages/FavoritePage'))
						.FavoritePage
				})
			},
			{
				path: 'place-an-order',
				lazy: async () => ({
					Component: (await import('@pages/PlaceAnOrderPage'))
						.PlaceAnOrderPage
				})
			},
			{
				path: 'profile',
				lazy: async () => ({
					Component: (await import('@pages/ProfilePage')).ProfilePage
				}),
				children: [
					{
						index: true,
						lazy: async () => ({
							Component: (await import('@pages/ProfilePage'))
								.ProfileHome
						})
					},
					{
						path: 'options',
						lazy: async () => ({
							Component: (
								await import('@pages/ProfileSettingsPage')
							).ProfileSettingsPage
						})
					},
					{
						path: 'orders',
						lazy: async () => ({
							Component: (await import('@pages/OrdersPage'))
								.OrdersPage
						})
					},
					{
						path: 'orders/:orderId',
						lazy: async () => ({
							Component: (await import('@pages/OrdersPage'))
								.OrderDetailPage
						})
					},
					{
						path: 'managers',
						lazy: async () => ({
							Component: (await import('@pages/ManagersPage'))
								.ManagersPage
						})
					},
					{
						path: 'organizations',
						lazy: async () => ({
							Component: (
								await import('@pages/OrganizationsPage')
							).OrganizationsPage
						})
					}
				]
			},
			{
				path: 'business-conditions',
				lazy: async () => ({
					Component: (await import('@pages/BusinessConditionsPage'))
						.BusinessConditionsPage
				})
			},
			{
				path: 'warranty',
				lazy: async () => ({
					Component: (await import('@pages/WarrantyPage'))
						.WarrantyPage
				})
			},
			{
				path: 'faq',
				lazy: async () => ({
					Component: (await import('@pages/FaqPage')).FaqPage
				})
			},
			{
				path: 'about-company',
				lazy: async () => ({
					Component: (await import('@pages/AboutCompanyPage'))
						.AboutCompanyPage
				})
			},
			{ path: '*', element: <NotFoundPage /> }
		]
	}
]);

const preloadPages = () => {
	void import('@pages/CatalogPage');
	void import('@pages/ProductPage');
};

const schedulePreload = () => {
	if ('requestIdleCallback' in window) {
		window.requestIdleCallback(preloadPages, { timeout: 5000 });
	} else {
		setTimeout(preloadPages, 3000);
	}
};

if (document.readyState === 'complete') {
	schedulePreload();
} else {
	window.addEventListener('load', schedulePreload, { once: true });
}
