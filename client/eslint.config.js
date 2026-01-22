const tsEslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettierConfig = require('eslint-config-prettier');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig(
    {
        files: ['**/*.ts'],
        extends: [
            ...tsEslint.configs.recommended,
            ...angular.configs.tsRecommended,
            prettierConfig,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            indent: ['error', 4],
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
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility,
            prettierConfig,
        ],
        rules: {},
    },
);
