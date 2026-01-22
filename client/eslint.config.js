const tsEslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierConfig = require('eslint-config-prettier');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig(
	{
		files: ['**/*.ts'],
		// prettierConfig is last, which is correct
		extends: [...tsEslint.configs.recommended, ...angular.configs.tsRecommended, prettierConfig],
		processor: angular.processInlineTemplates,
		rules: {
			// Removed indent, max-len, and no-tabs. Prettier handles this now.
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
		},
	},
	{
		files: ['**/*.html'],
		extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility, prettierConfig],
		rules: {},
	},
);
