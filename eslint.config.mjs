import rxjs from 'eslint-plugin-rxjs';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import * as tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import angulareslint from '@angular-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// Configure base ESLint settings
export default [
  // Ignores
  {
    ignores: ['src/framework/**/*', 'docs/**/*', 'packages-smoke/**/*', 'tools/dev-schematics/*/files'],
  },
  // Angular configuration
  ...compat.extends('plugin:@angular-eslint/recommended', 'plugin:@angular-eslint/template/process-inline-templates'),
  // Playground configuration
  {
    files: ['src/playground/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
      '@angular-eslint': angulareslint,
      rxjs,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './src/tsconfig.app.json',
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
    },
    rules: {
      '@angular-eslint/prefer-standalone': 'off',
    },
  },
  // E2E configuration
  {
    files: ['e2e/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
      rxjs,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './e2e/tsconfig.e2e.json',
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
    },
  },
];
