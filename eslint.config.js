import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

const LAYERS = ['shared', 'entities', 'features', 'widgets', 'pages', 'app'];

const DEEP_IMPORT_RULE = {
	group: [
		'@entities/*/**',
		'@features/*/**',
		'@widgets/*/**',
		'@pages/*/**'
	],
	message: 'Импортируйте слайс через его публичный API (index.ts).'
};

const layerBoundaries = LAYERS.map((layer, index) => ({
	files: [`src/${layer}/**/*.{ts,tsx}`],
	rules: {
		'@typescript-eslint/no-restricted-imports': [
			'error',
			{
				patterns: [
					DEEP_IMPORT_RULE,
					...LAYERS.slice(index + 1).map(upperLayer => ({
						group: [`@${upperLayer}`, `@${upperLayer}/**`],
						allowTypeImports: layer === 'shared' && upperLayer === 'app',
						message: `Слой ${layer} не может зависеть от слоя ${upperLayer}.`
					}))
				]
			}
		]
	}
}));

export default defineConfig([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		rules: {
			'no-empty': ['error', { allowEmptyCatch: true }],
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_' }
			]
		}
	},
	...layerBoundaries
]);
