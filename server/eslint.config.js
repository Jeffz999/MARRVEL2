const js = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
	js.configs.recommended,
	{
		ignores: [
			'node_modules/**',
			'*.log',
			'.env',
			'.env.*',
			'dist/**',
			'build/**',
			'coverage/**',
			'.nyc_output/**',
			'.DS_Store',
			'Thumbs.db',
		],
	},
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'commonjs',
			globals: {
				console: 'readonly',
				process: 'readonly',
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				module: 'readonly',
				require: 'readonly',
				exports: 'readonly',
				global: 'readonly',
				setTimeout: 'readonly',
				clearTimeout: 'readonly',
				setInterval: 'readonly',
				clearInterval: 'readonly',
			},
		},
		rules: {
			// Code quality & Logic (Prettier doesn't touch these)
			'no-unused-vars': ['error', { args: 'after-used', ignoreRestSiblings: true }],
			'no-console': 'off',
			'prefer-const': 'error',
			'no-var': 'error',
			camelcase: ['error', { properties: 'always' }],

			// Node.js specific
			'no-process-exit': 'error',
			'handle-callback-err': 'error',

			// Security and Best Practices
			'no-eval': 'error',
			'no-implied-eval': 'error',
			'no-new-func': 'error',
			'no-script-url': 'error',

			// Error Prevention
			'no-unreachable': 'error',
			'no-duplicate-case': 'error',
			'no-empty': 'error',
			'no-ex-assign': 'error',
			'no-extra-boolean-cast': 'error',
			'no-func-assign': 'error',
			'no-inner-declarations': 'error',
			'no-invalid-regexp': 'error',
			'no-obj-calls': 'error',
			'no-sparse-arrays': 'error',
			'no-unexpected-multiline': 'error',
			'use-isnan': 'error',
			'valid-typeof': 'error',

			// ES6+ Logic Standards
			'constructor-super': 'error',
			'no-class-assign': 'error',
			'no-const-assign': 'error',
			'no-dupe-class-members': 'error',
			'no-duplicate-imports': 'error',
			'no-new-symbol': 'error',
			'no-this-before-super': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-constructor': 'error',
			'no-useless-rename': 'error',
			'object-shorthand': 'warn',
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',

			// Async/Await and Promises
			'no-async-promise-executor': 'error',
			'no-promise-executor-return': 'error',
			'prefer-promise-reject-errors': 'warn',

			// Performance
			'no-loop-func': 'error',
			'no-extend-native': 'error',
			'no-proto': 'error',

			// Complexity Limits
			'max-depth': ['warn', 4],
			'max-nested-callbacks': ['warn', 3],
			'max-params': ['warn', 4],
		},
	},
	{
		files: ['**/*.js'],
		languageOptions: {
			sourceType: 'commonjs',
		},
	},
	// Put prettierConfig LAST so it disables any conflicting rules from above
	prettierConfig,
];
