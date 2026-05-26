import { createBrowserRouter } from 'react-router-dom';
import Layout from '@app/Layout';
import { HomePage } from '@pages/HomePage';
import { CatalogPage } from '@pages/CatalogPage';
import { ProductPage } from '@pages/ProductPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'catalog', element: <CatalogPage /> },
			{ path: 'product/:id', element: <ProductPage /> }
		]
	}
]);
