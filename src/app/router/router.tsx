import { createBrowserRouter } from 'react-router-dom';
import Layout from '@app/layout/Layout';
import { HomePage } from '@pages/HomePage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { Loader } from '@shared/ui/Loader';

// Страницы, кроме главной, подгружаются отдельными чанками при первом переходе.
// Пока чанк грузится, роутер оставляет на экране предыдущую страницу
export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		// Показывается, если сайт открыли сразу на подгружаемой странице
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
					Component: (await import('@pages/FavoritePage')).FavoritePage
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
				// Личный кабинет: ProfilePage проверяет вход и рисует меню разделов
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
							Component: (await import('@pages/ProfileSettingsPage'))
								.ProfileSettingsPage
						})
					},
					{
						path: 'orders',
						lazy: async () => ({
							Component: (await import('@pages/OrdersPage')).OrdersPage
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
							Component: (await import('@pages/OrganizationsPage'))
								.OrganizationsPage
						})
					}
				]
			},
			{
				path: 'warranty',
				lazy: async () => ({
					Component: (await import('@pages/WarrantyPage')).WarrantyPage
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
