import { createBrowserRouter } from 'react-router-dom';
import Layout from '@app/Layout';
import { HomePage } from '@pages/HomePage';
import { CatalogPage } from '@pages/CatalogPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'catalog', element: <CatalogPage /> }
		]
	}
]);
