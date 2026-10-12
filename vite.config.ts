import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

const REACT_PACKAGES = [
	'react',
	'react-dom',
	'react-router',
	'react-router-dom',
	'scheduler'
];
const STORE_PACKAGES = [
	'@reduxjs',
	'redux',
	'react-redux',
	'redux-saga',
	'@redux-saga',
	'typed-redux-saga',
	'redux-thunk',
	'use-sync-external-store',
	'immer',
	'reselect'
];
const VENDOR_PACKAGES = ['axios', 'clsx'];

const isFromPackages = (id: string, packages: string[]) =>
	packages.some(name => id.includes(`/node_modules/${name}/`));

export default defineConfig({
	plugins: [react(), basicSsl()],
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, './src/app'),
			'@entities': path.resolve(__dirname, './src/entities'),
			'@features': path.resolve(__dirname, './src/features'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@shared': path.resolve(__dirname, './src/shared'),
			'@widgets': path.resolve(__dirname, './src/widgets')
		}
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (!id.includes('/node_modules/')) return;

					if (isFromPackages(id, REACT_PACKAGES)) return 'react';
					if (isFromPackages(id, STORE_PACKAGES)) return 'store';
					if (isFromPackages(id, VENDOR_PACKAGES)) return 'vendor';

					// остальное Rollup раскладывает сам: зависимости ленивых
					// страниц (rc-slider) не попадают в стартовую загрузку
				}
			}
		}
	},
	server: {
		watch: {
			usePolling: true
		},
		host: true,
		strictPort: true,
		port: 3000
	}
});
