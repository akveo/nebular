import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import rxjsX from 'eslint-plugin-rxjs-x';
import angular from 'angular-eslint';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig({
  files: ['**/*.ts'],
  linterOptions: {
    reportUnusedInlineConfigs: 'warn',
  },
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...angular.configs.tsRecommended,
    rxjsX.configs.recommended,
    eslintConfigPrettier,
  ],
  processor: angular.processInlineTemplates,
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    '@angular-eslint': angular.tsPlugin,
  },
  ignores: [
    'src/framework/**/*',
  ],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    'no-restricted-globals': ['error', 'fit', 'fdescribe'],
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@angular-eslint/prefer-standalone': 'off',
    '@angular-eslint/prefer-inject': 'off',

    'rxjs-x/no-implicit-any-catch': 'off',
    'rxjs-x/no-sharereplay': 'off',
    'rxjs-x/no-unsafe-takeuntil': 'error',
  },
},
{
  files: ['**/*.component.html'],
  extends: [
    ...angular.configs.templateRecommended,
  ],
});
