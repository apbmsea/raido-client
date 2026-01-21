import { createBrowserRouter } from 'react-router-dom';
import Layout from '@app/Layout';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [{ index: true, element: <div style={{ height: "88vh"}}>home page</div> }]
	}
]);
