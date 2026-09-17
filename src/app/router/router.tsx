import { createBrowserRouter } from 'react-router-dom';
import Layout from '@app/Layout';
import { HomePage } from '@pages/HomePage';
import { CatalogPage } from '@pages/CatalogPage';
import { ProductPage } from '@pages/ProductPage';
import { ProfilePage } from '@pages/ProfilePage';
import { EditUserForm } from '@features/editUser';
import { CartPage } from '@pages/CartPage';
import { FavoritePage } from '@pages/FavoritePage';
import { OrdersPage } from '@pages/OrdersPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { WarrantyPage } from '@pages/WarrantyPage';
import { AboutCompanyPage } from '@pages/AboutCompanyPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'catalog', element: <CatalogPage /> },
			{ path: 'product/:id', element: <ProductPage /> },
			{ path: 'cart', element: <CartPage /> },
			{ path: 'favorite', element: <FavoritePage /> },
			{
				path: 'profile',
				element: <ProfilePage />,
				children: [
					{
						path: 'options',
						element: <EditUserForm />
					},

					{ index: true, element: <>Заглушка</> }, // URL: /profile (Личные данные)
					{ path: 'orders', element: <OrdersPage /> } // URL: /profile/orders (Заказы)
					// { path: 'favorites', element: <FavoritesPage /> } // URL: /profile/favorites (Избранное)
				]
			},

			{ path: 'warranty', element: <WarrantyPage /> },

			{ path: 'about-company', element: <AboutCompanyPage /> },

			{ path: '*', element: <NotFoundPage /> }
		]
	}
]);
