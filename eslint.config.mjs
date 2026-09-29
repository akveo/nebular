import angular from 'angular-eslint';
import prettier from 'eslint-config-prettier';
import rxjs from 'eslint-plugin-rxjs-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const forFiles = (configs, files) => configs.map((config) => ({ ...config, files }));

export default [
  { ignores: ['src/framework/**/*'] },
  ...forFiles(angular.configs.tsRecommended, ['**/*.ts']),
  {
    files: ['**/*.ts'],
    processor: angular.processInlineTemplates,
    plugins: { rxjs, '@typescript-eslint': tseslint.plugin },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['tsconfig.json', 'e2e/tsconfig.e2e.json'],
        createDefaultProgram: true,
      },
    },
    rules: {
      ...prettier.rules,
      quotes: 'off',
      'dot-notation': 'off',
      'no-restricted-globals': ['error', 'fit', 'fdescribe'],
      '@typescript-eslint/dot-notation': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'no-underscore-dangle': 'off',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/template/prefer-control-flow': 'off',
      'rxjs/no-unsafe-takeuntil': [
        'error',
        {
          allow: [
            'count',
            'defaultIfEmpty',
            'endWith',
            'every',
            'finalize',
            'finally',
            'isEmpty',
            'last',
            'max',
            'min',
            'publish',
            'publishBehavior',
            'publishLast',
            'publishReplay',
            'reduce',
            'share',
            'shareReplay',
            'skipLast',
            'takeLast',
            'throwIfEmpty',
            'toArray',
          ],
        },
      ],
    },
  },
  {
    files: ['e2e/**/*.ts', 'playwright.config.ts'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  ...forFiles(angular.configs.templateRecommended, ['**/*.html']),
  {
    files: ['**/*.html'],
    rules: {
      ...prettier.rules,
      '@angular-eslint/template/prefer-control-flow': 'off',
    },
  },
  {
    files: ['./*.js'],
    languageOptions: {
      globals: { ...globals.node },
      ecmaVersion: 2020,
      sourceType: 'commonjs',
    },
  },
];
